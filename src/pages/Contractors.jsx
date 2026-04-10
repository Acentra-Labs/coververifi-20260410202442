import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../components/shared/Toast';
import DataTable from '../components/shared/DataTable';
import StatusBadge from '../components/shared/StatusBadge';
import Modal from '../components/shared/Modal';
import { Building2, Plus } from 'lucide-react';
import { formatDate, formatPhone } from '../utils/formatters';
import { validateEmail, validateRequired, validatePhone } from '../utils/validators';

export default function Contractors() {
  const { generalContractors, addGC, updateGC, getSubsForGC, computeDashboardStats } = useData();
  const { addToast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [detailGC, setDetailGC] = useState(null);
  const [form, setForm] = useState({ company_name: '', contact_name: '', email: '', phone: '', address: '', license_number: '', additional_insured_required: false });
  const [formErrors, setFormErrors] = useState({});

  const columns = [
    { key: 'company_name', header: 'Company', accessor: 'company_name', render: row => (
      <div>
        <p className="font-medium text-gray-900">{row.company_name}</p>
        <p className="text-xs text-gray-500">{row.license_number}</p>
      </div>
    )},
    { key: 'contact_name', header: 'Contact', accessor: 'contact_name' },
    { key: 'email', header: 'Email', accessor: 'email', render: row => <span className="text-sm text-gray-600">{row.email}</span> },
    { key: 'phone', header: 'Phone', accessor: 'phone', render: row => <span className="text-sm text-gray-600">{formatPhone(row.phone)}</span> },
    { key: 'subs', header: 'Subs', accessor: row => getSubsForGC(row.id).length, sortable: true, render: row => (
      <span className="font-medium">{getSubsForGC(row.id).length}</span>
    )},
    { key: 'compliance', header: 'Compliance', sortable: false, render: row => {
      const stats = computeDashboardStats(row.id);
      return <span className="text-sm font-semibold text-electric">{stats.complianceRate}%</span>;
    }},
    { key: 'status', header: 'Status', accessor: 'status', render: row => <StatusBadge status={row.status} /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const nameErr = validateRequired(form.company_name, 'Company name');
    const contactErr = validateRequired(form.contact_name, 'Contact name');
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    if (nameErr) errors.company_name = nameErr;
    if (contactErr) errors.contact_name = contactErr;
    if (emailErr) errors.email = emailErr;
    if (phoneErr) errors.phone = phoneErr;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addGC(form);
    addToast(`${form.company_name} added successfully`, 'success');
    setShowAdd(false);
    setForm({ company_name: '', contact_name: '', email: '', phone: '', address: '', license_number: '', additional_insured_required: false });
    setFormErrors({});
  };

  const toggleStatus = (gc) => {
    const newStatus = gc.status === 'active' ? 'inactive' : 'active';
    updateGC(gc.id, { status: newStatus });
    addToast(`${gc.company_name} set to ${newStatus}`, 'info');
    setDetailGC(null);
  };

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric ${formErrors[field] ? 'border-red-300' : 'border-gray-300'}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-electric" />
            General Contractors
          </h1>
          <p className="text-sm text-gray-500 mt-1">{generalContractors.length} contractors registered</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-electric hover:bg-electric-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Contractor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={generalContractors}
        onRowClick={setDetailGC}
        searchPlaceholder="Search contractors..."
      />

      {/* Add modal */}
      <Modal open={showAdd} onClose={() => { setShowAdd(false); setFormErrors({}); }} title="Add General Contractor" size="lg">
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputCls('address')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input value={form.license_number} onChange={e => setForm(f => ({ ...f, license_number: e.target.value }))} className={inputCls('license_number')} placeholder="RCE-XXXXX" />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.additional_insured_required} onChange={e => setForm(f => ({ ...f, additional_insured_required: e.target.checked }))} className="rounded border-gray-300 text-electric focus:ring-electric" />
                <span className="text-sm text-gray-700">Require Additional Insured Endorsement</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => { setShowAdd(false); setFormErrors({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-electric hover:bg-electric-dark text-white text-sm font-medium rounded-lg transition-colors">Add Contractor</button>
          </div>
        </form>
      </Modal>

      {/* Detail modal */}
      <Modal open={!!detailGC} onClose={() => setDetailGC(null)} title={detailGC?.company_name || ''} size="lg">
        {detailGC && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-500">Contact</p><p className="font-medium">{detailGC.contact_name}</p></div>
              <div><p className="text-gray-500">Email</p><p className="font-medium">{detailGC.email}</p></div>
              <div><p className="text-gray-500">Phone</p><p className="font-medium">{formatPhone(detailGC.phone)}</p></div>
              <div><p className="text-gray-500">License</p><p className="font-medium">{detailGC.license_number || '—'}</p></div>
              <div><p className="text-gray-500">Address</p><p className="font-medium">{detailGC.address}</p></div>
              <div><p className="text-gray-500">Status</p><StatusBadge status={detailGC.status} /></div>
              <div><p className="text-gray-500">Addtl Insured Required</p><p className="font-medium">{detailGC.additional_insured_required ? 'Yes' : 'No'}</p></div>
              <div><p className="text-gray-500">Since</p><p className="font-medium">{formatDate(detailGC.created_at)}</p></div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => toggleStatus(detailGC)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${detailGC.status === 'active' ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
              >
                {detailGC.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
