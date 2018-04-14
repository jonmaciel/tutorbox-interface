export const AUTH_TOKEN = 'auth-token';
export const AUTH_USER = 'auth-user';
export const SIGNUP_REST_URL = 'http://localhost:3000/authenticate'
export const GRAPHQL_URL = 'http://localhost:3000/graphql'
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token)
export const setUser = user => localStorage.setItem(AUTH_USER, JSON.stringify(user))
export const getToken = () => localStorage.getItem(AUTH_TOKEN)

export const getUser = () => {
  const user = localStorage.getItem(AUTH_USER);
  if(!user) { return undefined }
  return JSON.parse(user)
}

export const getUserRole = () => {
  const user = getUser();

  if (!user) { return '' }
  return user.user_role
}

export const getCurrentOrganizationId = () => getUser().organization_id
export const isAdmin = () => getUserRole() === 'admin'
export const isOrganizationAdmin = () => getUserRole() === 'organization_admin'

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER);
}
