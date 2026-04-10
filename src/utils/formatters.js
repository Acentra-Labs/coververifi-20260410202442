export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatCurrency(amount) {
  if (amount === 'Statutory') return 'Statutory';
  if (!amount && amount !== 0) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPhone(phone) {
  if (!phone) return '—';
  return phone;
}

export function daysUntilExpiration(dateStr) {
  if (!dateStr) return null;
  const now = new Date();
  const exp = new Date(dateStr);
  const diff = exp - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getComplianceStatus(policy) {
  if (!policy) return 'missing';
  const days = daysUntilExpiration(policy.expiration_date);
  if (days === null) return 'missing';
  if (days < 0) return 'expired';
  if (days <= 30) return 'expiring';
  return 'compliant';
}

export function getStatusColor(status) {
  switch (status) {
    case 'compliant': return 'text-compliant';
    case 'expiring': return 'text-expiring';
    case 'expired': return 'text-expired';
    case 'missing': return 'text-missing';
    default: return 'text-gray-500';
  }
}

export function getStatusBgColor(status) {
  switch (status) {
    case 'compliant': return 'bg-green-50 border-green-200';
    case 'expiring': return 'bg-yellow-50 border-yellow-200';
    case 'expired': return 'bg-red-50 border-red-200';
    case 'missing': return 'bg-gray-50 border-gray-200';
    default: return 'bg-gray-50 border-gray-200';
  }
}

export function getStatusBadgeClasses(status) {
  switch (status) {
    case 'compliant': return 'bg-green-100 text-green-800';
    case 'expiring': return 'bg-yellow-100 text-yellow-800';
    case 'expired': return 'bg-red-100 text-red-800';
    case 'missing': return 'bg-gray-100 text-gray-600';
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-600';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'confirmed': return 'bg-green-100 text-green-800';
    case 'uploaded': return 'bg-blue-100 text-blue-800';
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'opened': return 'bg-purple-100 text-purple-800';
    case 'clicked': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export function truncate(str, len = 30) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
}
