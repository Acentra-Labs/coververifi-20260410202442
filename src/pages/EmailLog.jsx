import { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import { Mail } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

const TEMPLATE_LABELS = {
  verification_request: 'Verification Request',
  expiration_warning: 'Expiration Warning',
  lapse_notification: 'Lapse Notification',
};

export default function EmailLog() {
  const { emails, subcontractors, generalContractors } = useData();
  const [filter, setFilter] = useState('all');

  const enriched = useMemo(() => {
    let items = emails.map(e => {
      const sub = subcontractors.find(s => s.id === e.sub_id);
      const gc = generalContractors.find(g => g.id === e.gc_id);
      return { ...e, sub, gc };
    });
    if (filter !== 'all') {
      items = items.filter(e => e.template_type === filter);
    }
    return items.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at));
  }, [emails, subcontractors, generalContractors, filter]);

  const columns = [
    { key: 'to', header: 'To', accessor: 'to', render: row => <span className="text-sm font-mono">{row.to}</span> },
    {
      key: 'type', header: 'Type', accessor: 'template_type',
      render: row => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          row.template_type === 'verification_request' ? 'bg-blue-100 text-blue-700' :
          row.template_type === 'expiration_warning' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {TEMPLATE_LABELS[row.template_type] || row.template_type}
        </span>
      )
    },
    {
      key: 'sub', header: 'Subcontractor', accessor: row => row.sub?.company_name || '',
      render: row => <span className="text-sm text-gray-700">{row.sub?.company_name || '—'}</span>
    },
    {
      key: 'gc', header: 'GC', accessor: row => row.gc?.company_name || '',
      render: row => <span className="text-sm text-gray-700">{row.gc?.company_name || '—'}</span>
    },
    {
      key: 'sent_at', header: 'Sent', accessor: 'sent_at',
      render: row => <span className="text-sm text-gray-600">{formatDateTime(row.sent_at)}</span>
    },
    { key: 'status', header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
  ];

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'verification_request', label: 'Verification' },
    { value: 'expiration_warning', label: 'Expiration' },
    { value: 'lapse_notification', label: 'Lapse' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-6 h-6 text-electric" />
            Email Log
          </h1>
          <p className="text-sm text-gray-500 mt-1">{enriched.length} emails sent</p>
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: emails.length, color: 'text-gray-900' },
          { label: 'Opened', value: emails.filter(e => e.status === 'opened' || e.status === 'clicked').length, color: 'text-purple-600' },
          { label: 'Clicked', value: emails.filter(e => e.status === 'clicked').length, color: 'text-green-600' },
          { label: 'Pending', value: emails.filter(e => e.status === 'sent').length, color: 'text-blue-600' },
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
        searchPlaceholder="Search emails..."
      />
    </div>
  );
}
