export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const auth = localStorage.getItem('auth')
    
    if (!auth) {
      return navigateTo('/login')
    }

    try {
      const authData = JSON.parse(auth)
      if (!authData.token) {
        return navigateTo('/login')
      }
    } catch {
      return navigateTo('/login')
    }
  }
})
