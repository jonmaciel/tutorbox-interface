export const AUTH_TOKEN = 'auth-token';
export const SIGNUP_REST_URL = 'http://localhost:3000/authenticate'
export const GRAPHQL_URL = 'http://localhost:3000/graphql'
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token)
export const logout = () => localStorage.removeItem(AUTH_TOKEN)
export const getToken = () => localStorage.getItem(AUTH_TOKEN)
