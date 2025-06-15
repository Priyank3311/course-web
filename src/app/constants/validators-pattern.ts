export const ValidatorsPattern = {
  email: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$',
  mobile: /^[6-9]\\d{9}$/,
};
