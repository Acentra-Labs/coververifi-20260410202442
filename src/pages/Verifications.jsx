import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/shared/Toast';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import { FileText, Send, RefreshCw } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

export default function Verifications() {
  const { user, isAdmin } = useAuth();
  const { verifications, policies, subcontractors, agents, gcSubLinks, addVerificationRequest } = useData();
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all');

  const enriched = useMemo(() => {
    let items = verifications.map(v => {
      const policy = policies.find(p => p.id === v.policy_id);
      const sub = policy ? subcontractors.find(s => s.id === policy.sub_id) : null;
      const agent = agents.find(a => a.id === v.agent_id);
      return { ...v, policy, sub, agent };
    });

    if (!isAdmin && user?.gc_id) {
      const subIds = gcSubLinks.filter(l => l.gc_id === user.gc_id).map(l => l.sub_id);
      items = items.filter(v => v.sub && subIds.includes(v.sub.id));
    }
    if (filter !== 'all') {
      items = items.filter(v => v.status === filter);
    }
    return items.sort((a, b) => new Date(b.requested_at) - new Date(a.requested_at));
  }, [verifications, policies, subcontractors, agents, isAdmin, user?.gc_id, gcSubLinks, filter]);

  const resend = (verification) => {
    if (!verification.policy || !verification.agent) return;
    addVerificationRequest(verification.policy.id, verification.agent.id);
    addToast(`Verification re-sent to ${verification.agent.name}`, 'success');
  };

  const columns = [
    {
      key: 'sub', header: 'Subcontractor', accessor: row => row.sub?.company_name || '',
      render: row => (
        <div>
          <p className="font-medium text-gray-900">{row.sub?.company_name || '—'}</p>
          <p className="text-xs text-gray-500">{row.policy?.type === 'WC' ? "Workers' Comp" : 'General Liability'}</p>
        </div>
      )
    },
    {
      key: 'agent', header: 'Agent', accessor: row => row.agent?.name || '',
      render: row => (
        <div>
          <p className="text-sm text-gray-900">{row.agent?.name || '—'}</p>
          <p className="text-xs text-gray-500">{row.agent?.agency_name}</p>
        </div>
      )
    },
    {
      key: 'policy', header: 'Policy', accessor: row => row.policy?.policy_number || '',
      render: row => <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{row.policy?.policy_number || '—'}</code>
    },
    {
      key: 'requested_at', header: 'Requested', accessor: 'requested_at',
      render: row => <span className="text-sm text-gray-600">{formatDateTime(row.requested_at)}</span>
    },
    {
      key: 'responded_at', header: 'Responded', accessor: 'responded_at',
      render: row => row.responded_at
        ? <span className="text-sm text-gray-600">{formatDateTime(row.responded_at)}</span>
        : <span className="text-sm text-gray-400 italic">Awaiting</span>
    },
    { key: 'status', header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
    {
      key: 'actions', header: '', sortable: false,
      render: row => row.status === 'pending' ? (
        <button
          onClick={(e) => { e.stopPropagation(); resend(row); }}
          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-electric/10 text-electric rounded-md hover:bg-electric/20 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Resend
        </button>
      ) : null
    },
  ];

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'uploaded', label: 'Uploaded' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-electric" />
            Verification Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1">{enriched.length} requests</p>
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

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: verifications.length, color: 'text-gray-900' },
          { label: 'Pending', value: verifications.filter(v => v.status === 'pending').length, color: 'text-blue-600' },
          { label: 'Confirmed', value: verifications.filter(v => v.status === 'confirmed').length, color: 'text-green-600' },
          { label: 'Uploaded', value: verifications.filter(v => v.status === 'uploaded').length, color: 'text-purple-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={enriched}
        searchPlaceholder="Search verifications..."
      />
    </div>
  );
}
