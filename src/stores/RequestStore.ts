import {defineStore} from "pinia";
import type {RequestState} from "@/stores/state-types/RequestState.ts";
import {computed, ref} from "vue";

const initialRequestState: RequestState = { error: undefined, isLoading: false, request: undefined }
export const useRequestStore = defineStore('request', () => {

    const requestState = ref<RequestState>(initialRequestState);

    const isLoading = computed(() => requestState.value.isLoading)
    const request = computed(() => requestState.value.request)
    const error = computed(() => requestState.value.error)

    return { requestState, isLoading, request, error };
})
