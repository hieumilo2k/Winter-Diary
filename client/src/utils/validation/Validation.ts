export const isEmpty = (value: string) => {
  if (!value) return true;
  return false;
};

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const isPassword = (password: string) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;
  return re.test(password);
};

export const isMatch = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) return true;
  return false;
};
