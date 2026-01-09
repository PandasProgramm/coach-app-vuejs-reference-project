import {defineStore} from "pinia";
import type {AuthState} from "@/stores/state-types/AuthState.ts";
import {computed, ref} from "vue";

const initialAuthState: AuthState = { user: undefined, isAuthenticated: true, token: undefined, error: undefined, isLoading: false }

export const useAuthStore = defineStore('auth-stores', () => {
  const authState = ref<AuthState>(initialAuthState);

  const user = computed(() => authState.value.user)
  const isAuthenticated = computed(() => authState.value.isAuthenticated)
  const token = computed(() => authState.value.token)
  const isLoading = computed(() => authState.value.isLoading)
  const error = computed(() => authState.value.error)

  return { authState: authState, user, isAuthenticated, token, isLoading, error };
})
