export const setToken = (data:string) => localStorage.setItem('token',data)
export const getToken = () => localStorage.getItem('token')
export const deleteToken = () => localStorage.removeItem('token')