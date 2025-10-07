
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginForm = (email: string, password: string): { 
  isValid: boolean; 
  errors: { email?: string; password?: string } 
} => {
  const errors: { email?: string; password?: string } = {};
  
  if (!email) {
    errors.email = 'Email é obrigatório';
  } else if (!validateEmail(email)) {
    errors.email = 'Email inválido';
  }
  
  if (!password) {
    errors.password = 'Senha é obrigatória';
  } else if (!validatePassword(password)) {
    errors.password = 'Senha deve ter no mínimo 6 caracteres';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};