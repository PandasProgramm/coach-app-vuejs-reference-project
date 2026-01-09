import type {Coach} from "@/domain/Coach.ts";
import axios, {type AxiosResponse} from "axios";
import type {CoachToCreate} from "@/domain/CoachToCreate.ts";

class CoachHttpService {

  private apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_FIREBASE,
    headers: { 'Content-Type': 'application/json'}
  });

  async createCoach(coachToCreate: CoachToCreate): Promise<Coach> {
    try {
      const { data }: AxiosResponse<{ name: string }> = await this.apiClient.post(`/coaches.json`, coachToCreate);
      return {
        ...coachToCreate,
        id: data.name
      };
    } catch(error) {
      const errorMessage: string = error instanceof Error ? error.message : "Unknown error";
      throw new Error(errorMessage);
    }
  }

  async getAllCoaches(): Promise<Coach[]> {
    try {
      const { data }: AxiosResponse<Record<string, Coach>> = await this.apiClient.get(`/coaches.json`);

      if (!data || typeof data !== 'object') return [];
      return Object.entries(data).map(([firebaseKey, coach]) => ({
        ...coach,
        id: firebaseKey
      }));
    } catch(error) {
      const errorMessage: string = error instanceof Error ? error.message : "Unknown error";
      throw new Error(errorMessage);
    }
  }

  async deleteCoach(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/coaches/${id}.json`);
    }catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : "Unknown error";
      throw new Error(errorMessage);
    }
  }
}

export const coachHttpService = new CoachHttpService();
