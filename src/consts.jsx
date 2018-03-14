export const AUTH_TOKEN = 'auth-token';
export const SIGNUP_REST_URL = 'http://localhost:3000/authenticate'
export const getToken = () => localStorage.getItem(AUTH_TOKEN)
