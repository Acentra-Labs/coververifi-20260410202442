import { getStatusBadgeClasses } from '../../utils/formatters';

const LABELS = {
  compliant: 'Compliant',
  expiring: 'Expiring Soon',
  expired: 'Expired',
  missing: 'Not on File',
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  confirmed: 'Confirmed',
  uploaded: 'Uploaded',
  sent: 'Sent',
  opened: 'Opened',
  clicked: 'Clicked',
};

export default function StatusBadge({ status, label, className = '' }) {
  const text = label || LABELS[status] || status;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(status)} ${className}`}>
      {text}
    </span>
  );
}
