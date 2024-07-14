export const ValidateSignUpData = (formData) => {
  const errors = {};

  // Username validation
  if (!formData.userName) {
    errors.userName = "User name is required.";
  }

  // Email validation
  if (!formData.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid.";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required.";
  }

  return errors;
};
