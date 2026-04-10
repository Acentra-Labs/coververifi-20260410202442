import { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import DataTable from '../components/shared/DataTable';
import Modal from '../components/shared/Modal';
import { Users, Mail, Phone } from 'lucide-react';
import { formatDate, formatPhone } from '../utils/formatters';

export default function Agents() {
  const { agents, policies, subcontractors } = useData();
  const [detailAgent, setDetailAgent] = useState(null);

  const agentSubCount = useMemo(() => {
    const map = {};
    agents.forEach(a => {
      const pols = policies.filter(p => p.agent_id === a.id);
      const subIds = [...new Set(pols.map(p => p.sub_id))];
      map[a.id] = { policyCount: pols.length, subCount: subIds.length, subs: subIds };
    });
    return map;
  }, [agents, policies]);

  const columns = [
    {
      key: 'name', header: 'Agent', accessor: 'name', render: row => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.agency_name}</p>
        </div>
      )
    },
    {
      key: 'email', header: 'Email', accessor: 'email', render: row => (
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-sm text-gray-600">{row.email}</span>
        </div>
      )
    },
    {
      key: 'phone', header: 'Phone', accessor: 'phone', render: row => (
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-sm text-gray-600">{formatPhone(row.phone)}</span>
        </div>
      )
    },
    {
      key: 'subs', header: 'Subcontractors', sortable: true, accessor: row => agentSubCount[row.id]?.subCount || 0,
      render: row => <span className="font-medium">{agentSubCount[row.id]?.subCount || 0}</span>
    },
    {
      key: 'policies', header: 'Policies', sortable: true, accessor: row => agentSubCount[row.id]?.policyCount || 0,
      render: row => <span className="font-medium">{agentSubCount[row.id]?.policyCount || 0}</span>
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-electric" />
          Insurance Agents
        </h1>
        <p className="text-sm text-gray-500 mt-1">{agents.length} agents in directory</p>
      </div>

      <DataTable
        columns={columns}
        data={agents}
        onRowClick={setDetailAgent}
        searchPlaceholder="Search agents..."
      />

      <Modal open={!!detailAgent} onClose={() => setDetailAgent(null)} title={detailAgent?.name || ''} size="lg">
        {detailAgent && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Name</p><p className="font-medium">{detailAgent.name}</p></div>
              <div><p className="text-gray-500">Agency</p><p className="font-medium">{detailAgent.agency_name}</p></div>
              <div><p className="text-gray-500">Email</p><p className="font-medium">{detailAgent.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{detailAgent.phone}</p></div>
              <div><p className="text-gray-500">Address</p><p className="font-medium">{detailAgent.address}</p></div>
              <div><p className="text-gray-500">Since</p><p className="font-medium">{formatDate(detailAgent.created_at)}</p></div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Covered Subcontractors</h3>
              {(agentSubCount[detailAgent.id]?.subs || []).length === 0 ? (
                <p className="text-sm text-gray-400">No subcontractors linked</p>
              ) : (
                <div className="space-y-2">
                  {agentSubCount[detailAgent.id].subs.map(subId => {
                    const sub = subcontractors.find(s => s.id === subId);
                    const subPolicies = policies.filter(p => p.sub_id === subId && p.agent_id === detailAgent.id);
                    return sub ? (
                      <div key={subId} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium">{sub.company_name}</p>
                        <p className="text-xs text-gray-500">{subPolicies.map(p => `${p.type}: ${p.policy_number}`).join(' | ')}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
