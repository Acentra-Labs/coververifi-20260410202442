import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/shared/Toast';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import Modal from '../components/shared/Modal';
import { HardHat, Plus, AlertTriangle } from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { validateEmail, validateRequired, validatePhone } from '../utils/validators';

export default function Subcontractors() {
  const { user, isAdmin } = useAuth();
  const { subcontractors, getSubsForGC, getPoliciesForSub, addSubcontractor, addGCSubLink, generalContractors, gcSubLinks } = useData();
  const { addToast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [detailSub, setDetailSub] = useState(null);
  const [form, setForm] = useState({ company_name: '', contact_name: '', email: '', phone: '', address: '', trade: '', sole_proprietor: false, gc_id: '' });
  const [formErrors, setFormErrors] = useState({});

  const visibleSubs = useMemo(() => {
    if (isAdmin) return subcontractors;
    return getSubsForGC(user?.gc_id);
  }, [isAdmin, subcontractors, getSubsForGC, user?.gc_id]);

  const getSubComplianceStatus = (sub) => {
    const pols = getPoliciesForSub(sub.id);
    const wc = pols.find(p => p.type === 'WC');
    const gl = pols.find(p => p.type === 'GL');
    if (!wc && !gl && sub.sole_proprietor) return 'exempt';
    if (!wc || !gl) return 'missing';
    if (pols.some(p => p.status === 'expired')) return 'expired';
    if (pols.some(p => p.status === 'expiring')) return 'expiring';
    return 'compliant';
  };

  const columns = [
    {
      key: 'company_name', header: 'Company', accessor: 'company_name', render: row => (
        <div>
          <p className="font-medium text-gray-900">{row.company_name}</p>
          <p className="text-xs text-gray-500">{row.trade}</p>
        </div>
      )
    },
    { key: 'contact_name', header: 'Contact', accessor: 'contact_name' },
    { key: 'email', header: 'Email', accessor: 'email', render: row => <span className="text-sm text-gray-600">{row.email}</span> },
    {
      key: 'compliance', header: 'Coverage', sortable: false, render: row => {
        const status = getSubComplianceStatus(row);
        if (status === 'exempt') return <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">WC Exempt</span>;
        return <StatusBadge status={status} />;
      }
    },
    {
      key: 'sole_prop', header: 'Type', sortable: false, render: row => (
        row.sole_proprietor
          ? <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3" />Sole Prop</span>
          : <span className="text-xs text-gray-500">LLC/Corp</span>
      )
    },
    { key: 'status', header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
    { key: 'w9', header: 'W9', sortable: false, render: row => row.w9_file_url ? <span className="text-xs text-green-600 font-medium">On File</span> : <span className="text-xs text-red-500">Missing</span> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (validateRequired(form.company_name, 'Company name')) errors.company_name = validateRequired(form.company_name, 'Company name');
    if (validateRequired(form.contact_name, 'Contact name')) errors.contact_name = validateRequired(form.contact_name, 'Contact name');
    if (validateEmail(form.email)) errors.email = validateEmail(form.email);
    if (validatePhone(form.phone)) errors.phone = validatePhone(form.phone);
    if (validateRequired(form.trade, 'Trade')) errors.trade = validateRequired(form.trade, 'Trade');
    if (isAdmin && !form.gc_id) errors.gc_id = 'Select a contractor';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const gcId = isAdmin ? form.gc_id : user?.gc_id;
    const newSub = addSubcontractor({ ...form, status: 'pending', w9_file_url: null, w9_expiration: null });
    addGCSubLink(gcId, newSub.id);
    addToast(`${form.company_name} added successfully`, 'success');
    setShowAdd(false);
    setForm({ company_name: '', contact_name: '', email: '', phone: '', address: '', trade: '', sole_proprietor: false, gc_id: '' });
    setFormErrors({});
  };

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric ${formErrors[field] ? 'border-red-300' : 'border-gray-300'}`;

  const trades = ['Electrical', 'Plumbing', 'HVAC', 'Framing', 'Roofing', 'Concrete', 'Drywall', 'Painting', 'Excavation', 'Masonry', 'Flooring', 'Insulation', 'Landscaping', 'Other'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HardHat className="w-6 h-6 text-electric" />
            {isAdmin ? 'All Subcontractors' : 'My Subcontractors'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{visibleSubs.length} subcontractors</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-electric hover:bg-electric-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Subcontractor
        </button>
      </div>

      {/* Sole Proprietor warning */}
      {visibleSubs.some(s => s.sole_proprietor) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">Sole Proprietor Alert</p>
            <p className="text-amber-700 mt-1">
              Sole proprietors may be exempt from Workers' Comp under Idaho Code §72-212(4), but GCs remain liable as statutory employers under §72-216. Track carefully.
            </p>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={visibleSubs}
        onRowClick={setDetailSub}
        searchPlaceholder="Search subcontractors..."
      />

      {/* Add Modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setFormErrors({}); }} title="Add Subcontractor" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} className={inputCls('company_name')} />
              {formErrors.company_name && <p className="text-xs text-red-500 mt-1">{formErrors.company_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} className={inputCls('contact_name')} />
              {formErrors.contact_name && <p className="text-xs text-red-500 mt-1">{formErrors.contact_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls('email')} />
              {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputCls('phone')} placeholder="(208) 555-0000" />
              {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trade *</label>
              <select value={form.trade} onChange={e => setForm(f => ({ ...f, trade: e.target.value }))} className={inputCls('trade')}>
                <option value="">Select trade...</option>
                {trades.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {formErrors.trade && <p className="text-xs text-red-500 mt-1">{formErrors.trade}</p>}
            </div>
            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to GC *</label>
                <select value={form.gc_id} onChange={e => setForm(f => ({ ...f, gc_id: e.target.value }))} className={inputCls('gc_id')}>
                  <option value="">Select contractor...</option>
                  {generalContractors.filter(gc => gc.status === 'active').map(gc => (
                    <option key={gc.id} value={gc.id}>{gc.company_name}</option>
                  ))}
                </select>
                {formErrors.gc_id && <p className="text-xs text-red-500 mt-1">{formErrors.gc_id}</p>}
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputCls('address')} />
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.sole_proprietor} onChange={e => setForm(f => ({ ...f, sole_proprietor: e.target.checked }))} className="rounded border-gray-300 text-electric focus:ring-electric" />
                <span className="text-sm text-gray-700">Sole Proprietor</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => { setShowAdd(false); setFormErrors({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-electric hover:bg-electric-dark text-white text-sm font-medium rounded-lg transition-colors">Add Subcontractor</button>
          </div>
        </form>
      </Modal>

      {/* Detail modal */}
      <Modal open={!!detailSub} onClose={() => setDetailSub(null)} title={detailSub?.company_name || ''} size="lg">
        {detailSub && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Contact</p><p className="font-medium">{detailSub.contact_name}</p></div>
              <div><p className="text-gray-500">Email</p><p className="font-medium">{detailSub.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{detailSub.phone}</p></div>
              <div><p className="text-gray-500">Trade</p><p className="font-medium">{detailSub.trade}</p></div>
              <div><p className="text-gray-500">Address</p><p className="font-medium">{detailSub.address}</p></div>
              <div><p className="text-gray-500">Status</p><StatusBadge status={detailSub.status} /></div>
              <div><p className="text-gray-500">Type</p><p className="font-medium">{detailSub.sole_proprietor ? 'Sole Proprietor' : 'LLC/Corporation'}</p></div>
              <div><p className="text-gray-500">W9</p><p className="font-medium">{detailSub.w9_file_url ? 'On File' : 'Missing'}</p></div>
              <div><p className="text-gray-500">W9 Expiration</p><p className="font-medium">{formatDate(detailSub.w9_expiration)}</p></div>
              <div><p className="text-gray-500">Added</p><p className="font-medium">{formatDate(detailSub.created_at)}</p></div>
            </div>
            {detailSub.sole_proprietor && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
                <strong>Warning:</strong> Sole proprietors may be exempt from WC under Idaho Code §72-212(4), but GC statutory employer liability under §72-216 still applies.
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Policies</h3>
              {getPoliciesForSub(detailSub.id).length === 0 ? (
                <p className="text-sm text-gray-400">No policies on file</p>
              ) : (
                <div className="space-y-2">
                  {getPoliciesForSub(detailSub.id).map(pol => (
                    <div key={pol.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{pol.type === 'WC' ? "Workers' Comp" : 'General Liability'}</p>
                        <p className="text-xs text-gray-500">{pol.carrier} — {pol.policy_number}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={pol.status} />
                        <p className="text-xs text-gray-400 mt-1">Exp: {formatDate(pol.expiration_date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {isAdmin && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Assigned to GCs</h3>
                <div className="flex flex-wrap gap-2">
                  {gcSubLinks.filter(l => l.sub_id === detailSub.id).map(link => {
                    const gc = generalContractors.find(g => g.id === link.gc_id);
                    return gc ? (
                      <span key={link.id} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{gc.company_name}</span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
