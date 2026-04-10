import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import {
  ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion,
  Building2, HardHat, FileText, TrendingUp
} from 'lucide-react';
import StatsCard from '../components/shared/StatsCard';
import StatusBadge from '../components/shared/StatusBadge';
import { formatDate, daysUntilExpiration } from '../utils/formatters';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const { generalContractors, subcontractors, policies, gcSubLinks, computeDashboardStats, getSubsForGC } = useData();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    return computeDashboardStats(isAdmin ? null : user?.gc_id);
  }, [computeDashboardStats, isAdmin, user?.gc_id]);

  const expiringPolicies = useMemo(() => {
    let relevantPolicies = policies;
    if (!isAdmin && user?.gc_id) {
      const subIds = gcSubLinks.filter(l => l.gc_id === user.gc_id).map(l => l.sub_id);
      relevantPolicies = policies.filter(p => subIds.includes(p.sub_id));
    }
    return relevantPolicies
      .filter(p => {
        const days = daysUntilExpiration(p.expiration_date);
        return days !== null && days <= 30;
      })
      .sort((a, b) => new Date(a.expiration_date) - new Date(b.expiration_date))
      .slice(0, 8);
  }, [policies, isAdmin, user?.gc_id, gcSubLinks]);

  const recentSubs = useMemo(() => {
    if (isAdmin) {
      return subcontractors.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
    }
    return getSubsForGC(user?.gc_id).slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
  }, [isAdmin, subcontractors, getSubsForGC, user?.gc_id]);

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          {isAdmin ? 'System-wide compliance overview' : 'Your subcontractor compliance status'}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin && (
          <StatsCard
            icon={Building2}
            label="General Contractors"
            value={generalContractors.filter(gc => gc.status === 'active').length}
            color="text-electric"
          />
        )}
        <StatsCard
          icon={HardHat}
          label="Subcontractors"
          value={stats.totalSubcontractors}
          color="text-navy"
        />
        <StatsCard
          icon={ShieldCheck}
          label="Compliant Policies"
          value={stats.compliant}
          color="text-compliant"
        />
        <StatsCard
          icon={ShieldAlert}
          label="Expiring Soon"
          value={stats.expiringSoon}
          color="text-expiring"
        />
        <StatsCard
          icon={ShieldX}
          label="Expired"
          value={stats.expired}
          color="text-expired"
        />
        {!isAdmin && (
          <StatsCard
            icon={ShieldQuestion}
            label="Missing"
            value={stats.missing}
            color="text-missing"
          />
        )}
      </div>

      {/* Compliance rate */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-electric" />
            <h2 className="text-lg font-semibold text-gray-900">Compliance Rate</h2>
          </div>
          <span className="text-3xl font-bold text-electric">{stats.complianceRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-electric to-cyan transition-all duration-500"
            style={{ width: `${stats.complianceRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{stats.compliant} compliant</span>
          <span>{stats.totalPolicies + stats.missing} total expected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiring/expired policies */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Policies Needing Attention</h2>
            <button
              onClick={() => navigate('/policies')}
              className="text-sm text-electric hover:text-electric-dark font-medium"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {expiringPolicies.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                All policies are up to date!
              </div>
            ) : (
              expiringPolicies.map(policy => {
                const sub = subcontractors.find(s => s.id === policy.sub_id);
                const days = daysUntilExpiration(policy.expiration_date);
                return (
                  <div
                    key={policy.id}
                    className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate('/policies')}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{sub?.company_name}</p>
                      <p className="text-xs text-gray-500">{policy.type === 'WC' ? "Workers' Comp" : 'General Liability'} &mdash; {policy.policy_number}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={days < 0 ? 'expired' : 'expiring'} />
                      <p className="text-xs text-gray-400 mt-1">
                        {days < 0 ? `Expired ${Math.abs(days)}d ago` : `${days}d remaining`}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent subcontractors */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Subcontractors</h2>
            <button
              onClick={() => navigate('/subcontractors')}
              className="text-sm text-electric hover:text-electric-dark font-medium"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSubs.map(sub => (
              <div
                key={sub.id}
                className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate('/subcontractors')}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{sub.company_name}</p>
                  <p className="text-xs text-gray-500">{sub.trade} &mdash; {sub.contact_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={sub.status} />
                  {sub.sole_proprietor && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Sole Prop</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
