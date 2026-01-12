import axios from 'axios'

class AuthHttpService {
  private apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_FIREBASE,
    headers: { 'Content-Type': 'application/json' },
  })

  async onSignInWithEmailAndPassword(email: string, password: string): Promise<Response> {
    return await this.apiClient.post('/auth', { email, password })
  }
}

export const authHttpService = new AuthHttpService()
