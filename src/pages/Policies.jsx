import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/shared/Toast';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import Modal from '../components/shared/Modal';
import { Shield, Send, AlertTriangle, Info } from 'lucide-react';
import { formatDate, formatCurrency, daysUntilExpiration } from '../utils/formatters';

export default function Policies() {
  const { user, isAdmin } = useAuth();
  const { policies, subcontractors, agents, gcSubLinks, addVerificationRequest, idahoComplianceDefaults, getVerificationsForPolicy } = useData();
  const { addToast } = useToast();
  const [detailPol, setDetailPol] = useState(null);
  const [filter, setFilter] = useState('all');

  const visiblePolicies = useMemo(() => {
    let pols = policies;
    if (!isAdmin && user?.gc_id) {
      const subIds = gcSubLinks.filter(l => l.gc_id === user.gc_id).map(l => l.sub_id);
      pols = policies.filter(p => subIds.includes(p.sub_id));
    }
    if (filter !== 'all') {
      pols = pols.filter(p => p.status === filter);
    }
    return pols;
  }, [policies, isAdmin, user?.gc_id, gcSubLinks, filter]);

  const columns = [
    {
      key: 'sub', header: 'Subcontractor', accessor: row => {
        const sub = subcontractors.find(s => s.id === row.sub_id);
        return sub?.company_name || '';
      }, render: row => {
        const sub = subcontractors.find(s => s.id === row.sub_id);
        return (
          <div>
            <p className="font-medium text-gray-900">{sub?.company_name}</p>
            <p className="text-xs text-gray-500">{sub?.trade}</p>
          </div>
        );
      }
    },
    {
      key: 'type', header: 'Type', accessor: 'type', render: row => (
        <span className="text-sm font-medium">{row.type === 'WC' ? "Workers' Comp" : 'General Liability'}</span>
      )
    },
    { key: 'carrier', header: 'Carrier', accessor: 'carrier' },
    { key: 'policy_number', header: 'Policy #', accessor: 'policy_number', render: row => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{row.policy_number}</code> },
    {
      key: 'coverage', header: 'Coverage', sortable: false, render: row => (
        <span className="text-sm">{formatCurrency(row.coverage_amount)}</span>
      )
    },
    { key: 'expiration_date', header: 'Expires', accessor: 'expiration_date', render: row => {
      const days = daysUntilExpiration(row.expiration_date);
      return (
        <div>
          <p className="text-sm">{formatDate(row.expiration_date)}</p>
          {days !== null && days <= 30 && (
            <p className={`text-xs ${days < 0 ? 'text-red-500' : 'text-yellow-600'}`}>
              {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
            </p>
          )}
        </div>
      );
    }},
    { key: 'status', header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
  ];

  const sendVerification = (policy) => {
    if (!policy.agent_id) {
      addToast('No agent assigned to this policy', 'warning');
      return;
    }
    addVerificationRequest(policy.id, policy.agent_id);
    const agent = agents.find(a => a.id === policy.agent_id);
    addToast(`Verification request sent to ${agent?.name || 'agent'}`, 'success');
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'compliant', label: 'Compliant' },
    { value: 'expiring', label: 'Expiring' },
    { value: 'expired', label: 'Expired' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 text-electric" />
            Insurance Policies
          </h1>
          <p className="text-sm text-gray-500 mt-1">{visiblePolicies.length} policies</p>
        </div>
        <div className="flex items-center gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${filter === f.value ? 'bg-electric text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Idaho compliance note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Idaho Compliance Defaults</p>
          <p className="mt-1">
            GL: {formatCurrency(idahoComplianceDefaults.gl_per_occurrence)} per occurrence / {formatCurrency(idahoComplianceDefaults.gl_aggregate)} aggregate
            &nbsp;&bull;&nbsp; WC: {idahoComplianceDefaults.wc_coverage} + {formatCurrency(idahoComplianceDefaults.wc_employer_liability)} employer&apos;s liability
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={visiblePolicies}
        onRowClick={setDetailPol}
        searchPlaceholder="Search policies..."
      />

      {/* Detail modal */}
      <Modal open={!!detailPol} onClose={() => setDetailPol(null)} title="Policy Details" size="lg">
        {detailPol && (() => {
          const sub = subcontractors.find(s => s.id === detailPol.sub_id);
          const agent = agents.find(a => a.id === detailPol.agent_id);
          const verifications = getVerificationsForPolicy(detailPol.id);
          return (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500">Subcontractor</p><p className="font-medium">{sub?.company_name}</p></div>
                <div><p className="text-gray-500">Type</p><p className="font-medium">{detailPol.type === 'WC' ? "Workers' Compensation" : 'General Liability'}</p></div>
                <div><p className="text-gray-500">Carrier</p><p className="font-medium">{detailPol.carrier}</p></div>
                <div><p className="text-gray-500">Policy Number</p><p className="font-medium font-mono">{detailPol.policy_number}</p></div>
                <div><p className="text-gray-500">Coverage</p><p className="font-medium">{formatCurrency(detailPol.coverage_amount)}</p></div>
                {detailPol.aggregate && <div><p className="text-gray-500">Aggregate</p><p className="font-medium">{formatCurrency(detailPol.aggregate)}</p></div>}
                {detailPol.employer_liability && <div><p className="text-gray-500">Employer Liability</p><p className="font-medium">{formatCurrency(detailPol.employer_liability)}</p></div>}
                <div><p className="text-gray-500">Effective</p><p className="font-medium">{formatDate(detailPol.effective_date)}</p></div>
                <div><p className="text-gray-500">Expires</p><p className="font-medium">{formatDate(detailPol.expiration_date)}</p></div>
                <div><p className="text-gray-500">Status</p><StatusBadge status={detailPol.status} /></div>
              </div>

              {agent && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Insurance Agent</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-gray-500">Name</p><p className="font-medium">{agent.name}</p></div>
                    <div><p className="text-gray-500">Agency</p><p className="font-medium">{agent.agency_name}</p></div>
                    <div><p className="text-gray-500">Email</p><p className="font-medium">{agent.email}</p></div>
                    <div><p className="text-gray-500">Phone</p><p className="font-medium">{agent.phone}</p></div>
                  </div>
                </div>
              )}

              {verifications.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Verification History</h3>
                  <div className="space-y-2">
                    {verifications.map(v => (
                      <div key={v.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <p className="text-gray-700">Requested {formatDate(v.requested_at)}</p>
                          {v.responded_at && <p className="text-xs text-gray-500">Responded {formatDate(v.responded_at)}</p>}
                        </div>
                        <StatusBadge status={v.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(detailPol.status === 'expiring' || detailPol.status === 'expired') && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">
                    {detailPol.status === 'expired'
                      ? 'This policy has expired. GC may be liable under Idaho Code §72-216.'
                      : 'This policy is expiring soon. Send a verification request to the agent.'}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                {detailPol.certificate_url && (
                  <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    View Certificate
                  </button>
                )}
                <button
                  onClick={() => { sendVerification(detailPol); setDetailPol(null); }}
                  className="flex items-center gap-2 px-4 py-2 bg-electric hover:bg-electric-dark text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Send Verification
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
