import {defineStore} from "pinia";
import type {RequestState} from "@/stores/state-types/RequestState.ts";
import {computed, ref} from "vue";
import type { RequestToCreate } from '@/domain/RequestToCreate.ts'
import { requestHttpService } from '@/service/RequestHttpService.ts'

export const useRequestStore = defineStore('request', () => {

    const initialRequestState: RequestState = { error: undefined, isLoading: false, requests: [] }
    const requestState = ref<RequestState>(initialRequestState);

    const isLoading = computed(() => requestState.value.isLoading)
    const requests = computed(() => requestState.value.requests)
    const error = computed(() => requestState.value.error)
    const selectedRequestsFromCoach = computed(() => {
      return (coachId: string) => requestState.value.requests.filter(request => request.coachId === coachId)
    }) // normally we would fetch directly from backend -> performance

    async function createRequest(requestToCreate: RequestToCreate) {
      requestState.value.isLoading = true
      try {
        const response = await requestHttpService.createRequest(requestToCreate)
        if (response) {
          requestState.value.requests.push(response);
        }
      }  catch (error) {
        requestState.value.error = error instanceof Error ? error.message : "An unknown error occurred";
      } finally {
        requestState.value.isLoading = false;
      }
    }

    async function getAllRequests() {
      requestState.value.isLoading = true;
      try {
        requestState.value.requests = await requestHttpService.getAllRequests();
      } catch (error) {
        requestState.value.error = error instanceof Error ? error.message : "An unknown error occurred";
      } finally {
        requestState.value.isLoading = false;
      }
    }

    async function deleteRequest(id: string) {
      requestState.value.isLoading = true;
      try {
        await requestHttpService.deleteRequest(id);
        requestState.value.requests = requestState.value.requests.filter(
          (request) => request.id !== id,
        );
      } catch (error) {
        requestState.value.error = error instanceof Error ? error.message : "An unknown error occurred";
      } finally {
        requestState.value.isLoading = false
      }
    }
    return {
      requestState,
      isLoading,
      requests,
      error,
      selectedRequestsFromCoach,
      deleteRequest,
      createRequest,
      fetchAll: getAllRequests,
    }
})
