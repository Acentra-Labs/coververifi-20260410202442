export function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email address';
  return null;
}

export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validatePhone(phone) {
  if (!phone) return 'Phone number is required';
  const cleaned = phone.replace(/[\s\-().]/g, '');
  if (cleaned.length < 10) return 'Phone number must be at least 10 digits';
  return null;
}

export function validateDate(dateStr, fieldName) {
  if (!dateStr) return `${fieldName} is required`;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return `${fieldName} is not a valid date`;
  return null;
}

export function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) return null;
  if (new Date(startDate) >= new Date(endDate)) {
    return 'End date must be after start date';
  }
  return null;
}

export function validateForm(fields) {
  const errors = {};
  let hasError = false;

  for (const [key, { value, validators }] of Object.entries(fields)) {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors[key] = error;
        hasError = true;
        break;
      }
    }
  }

  return { errors, isValid: !hasError };
}
