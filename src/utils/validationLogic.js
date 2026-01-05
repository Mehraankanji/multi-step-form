export const validatorsByType = {
  text: (value, label) =>
    !value || value.trim() === "" ? `${label} is required` : undefined,

  number: (value, label, fieldName) => {
    if (value === "" || value === null || value === undefined)
      return `${label} is required`;
    if (isNaN(Number(value))) return `${label} must be a number`;

    if (
      (fieldName === "pincode" || fieldName === "pinCode") &&
      value.length !== 6
    ) {
      return `${label} must be exactly 6 digits`;
    }

    return undefined;
  },

  email: (value, label) => {
    if (!value) return `${label} is required`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email";
    return undefined;
  },

  phone: (value, label) => {
    if (!value) return `${label} is required`;
    if (!/^\d+$/.test(value)) return `${label} must contain only digits`;
    if (value.length !== 10) return `${label} must be exactly 10 digits`;
    return undefined;
  },

  radio: (value, label) => (!value ? `${label} is required` : undefined),

  declaration: (value) =>
    value !== true ? "You must accept the declaration" : undefined,

  date: (value, label) => {
    if (!value) return `${label} is required`;

    const selectedDate = new Date(value);
    if (isNaN(selectedDate.getTime())) return `${label} must be a valid date`;
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) return `${label} cannot be a future date`;

    return undefined;
  },

  "datetime-local": (value, label) => {
    if (!value) return `${label} is required`;

    const dateTime = new Date(value);
    if (isNaN(dateTime.getTime())) {
      return `${label} must be a valid date and time`;
    }

    const now = new Date();
    if (dateTime > now) {
      return `${label} cannot be in the future`;
    }

    return undefined;
  },
  

  file: (value, label) => {
    if (!value) return `${label} is required`;
    return undefined;
  },

  "checkbox-group": (value, label) => {
    if (!value || Object.values(value).every((v) => v !== true)) {
      return `Select at least one option for ${label}`;
    }
    return undefined;
  },
  "yes-no-group": (value, label, fieldName) => {
    if (!value || Object.keys(value).length === 0)
      return `${label} is required`;

    const unanswered = Object.values(value).some(
      (v) => v !== "Yes" && v !== "No"
    );

    if (unanswered) return `Please answer all options for ${label}`;

    return undefined;
  },

  "expense-group": (value, label) => {
    if (!value) return `${label} is required`;

    const keys = Object.keys(value);
    if (keys.length === 0) return `${label} is required`;

    const totalKey = keys[keys.length - 1];

    const hasValue = keys
      .filter((k) => k !== totalKey)
      .some((k) => Number(value[k]) > 0);

    if (!hasValue) {
      return `Enter at least one expense in ${label}`;
    }

    return undefined;
  },
};

// Check fullState before final submit
export function isFormComplete(fullState) {
  for (const part of Object.values(fullState)) {
    for (const section of Object.values(part)) {
      for (const value of Object.values(section)) {
        if (value === "" || value === null || value === undefined) return false;
        if (
          typeof value === "object" &&
          Object.values(value).some(
            (v) => v === "" || v === null || v === undefined || v === false
          )
        )
          return false;
      }
    }
  }
  return true;
}

/* ================= SINGLE ENTRY POINT ================= */
export const validateField = ({
  value,
  field,
  isAutofilled,
  isAgeField,
  shouldDisable,
}) => {
  if (isAutofilled || isAgeField || shouldDisable) return undefined;

  return validatorsByType[field.type]?.(value, field.label, field.name);
};
