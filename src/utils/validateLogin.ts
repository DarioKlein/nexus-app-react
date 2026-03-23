export function validateLogin(email: string, password: string) {
  const errors = { email: '', password: '' }
  let valid = true

  if (!email) {
    errors.email = 'E-mail obrigatório'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'E-mail inválido'
    valid = false
  }

  if (!password) {
    errors.password = 'Senha obrigatória'
    valid = false
  } else if (password.length < 6) {
    errors.password = 'Mínimo 6 caracteres'
    valid = false
  }

  return { valid, errors }
}
