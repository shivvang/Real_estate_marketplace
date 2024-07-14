export const validateSignInData = (formData) => {
  const errors = {};

  // Email validation
  if (!formData.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid.";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(formData.password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one special character.";
  }

  return errors;
};
