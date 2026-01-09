import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { Request } from '@/domain/Request.ts'
import type { RequestToCreate } from '@/domain/RequestToCreate.ts'

class RequestHttpService {

  private readonly apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_FIREBASE,
    headers: { 'Content-Type': 'application/json' }
  });

  async getAllRequests(): Promise<Request[]> {

    try {
      const { data }: AxiosResponse<Record<string, Request>> = await this.apiClient.get(`/requests.json`);
      if (!data) {
        return []
      }
      return Object.entries(data).map(([firebaseKey, request]) => ({
        ...request,
        id: firebaseKey
      }))
    }catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(errorMessage)
    }
  }

  async createRequest(requestToCreate: RequestToCreate): Promise<Request> {
    try {
      const { data } = await this.apiClient.post(`/requests.json`, requestToCreate)
      return {
        ...requestToCreate,
        id: data.name
      }
    }catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(errorMessage)
    }
  }

  async deleteRequest(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/requests/${id}.json`)
    }catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(errorMessage)
    }
  }
}

export const requestHttpService = new RequestHttpService()
