export function useAuth() {
  const { login: apiLogin, register: apiRegister } = useApi()

  async function register(payload: { nome: string, cpf_cnpj: string, email: string, password: string, telefone?: string }) {
    try {
      // Converter 'password' para 'senha' para o backend
      const { password, ...rest } = payload
      return await apiRegister({ ...rest, senha: password })
    } catch (err) {
      throw err
    }
  }

  async function login(payload: { email: string, password: string }) {
    try {
      // Converter 'password' para 'senha' para o backend
      return await apiLogin(payload.email, payload.password)
    } catch (err) {
      throw err
    }
  }

  return { register, login }
}
