const TOKEN_KEY = 'stockmind_token'
export const obtenerToken = () => window.localStorage.getItem(TOKEN_KEY)
export const guardarToken = (token) => window.localStorage.setItem(TOKEN_KEY, token)
export const eliminarToken = () => window.localStorage.removeItem(TOKEN_KEY)
