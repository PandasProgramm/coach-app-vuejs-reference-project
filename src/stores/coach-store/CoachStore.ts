import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CoachState } from '@/stores/state-types/CoachState.ts'
import { coachHttpService } from '@/service/CoachHttpService.ts'
import type { CoachToCreate } from '@/domain/CoachToCreate.ts'
import { CoachingFocus } from '@/domain/Coach.ts'

const initialCoachState: CoachState = { coaches: [], error: undefined, isLoading: false }

export const useCoachStore = defineStore('coach-stores', () => {
  const coachState = ref<CoachState>(initialCoachState)

  const isLoading = computed(() => coachState.value.isLoading)
  const activeFilters = ref<CoachingFocus[]>([])

  const coaches = computed(() =>
    coachState.value.coaches.filter((coach) =>
      activeFilters.value.length === 0
        ? coachState.value.coaches
        : coach.coachingFocus.some((focus) => activeFilters.value.includes(focus))
    ),
  )

  const selectedCoach = computed(
    () => (coachId: string) =>
      coachState.value.coaches.find((coach) => coach.id === coachId) ?? undefined,
  )

  const error = computed(() => coachState.value.error)

  function addFilter(coachFocus: CoachingFocus): void {
    if (!activeFilters.value.includes(coachFocus)) {
      activeFilters.value.push(coachFocus)
    }
  }

  function removeFilter(coachFocus: CoachingFocus): void {
    const index = activeFilters.value.indexOf(coachFocus)
    if (index !== -1) {
      activeFilters.value.splice(index, 1)
    }
  }

  async function createCoach(coachToCreate: CoachToCreate): Promise<void> {
    coachState.value.isLoading = true
    try {
      const response = await coachHttpService.createCoach(coachToCreate)
      if (response) {
        coachState.value.coaches.push(response)
      }
    } catch (error) {
      coachState.value.error = error instanceof Error ? error.message : 'An unknown error occurred'
    } finally {
      coachState.value.isLoading = false
    }
  }

  async function fetchCoaches(): Promise<void> {
    coachState.value.isLoading = true
    try {
      coachState.value.coaches = await coachHttpService.getAllCoaches()
    } catch (error) {
      coachState.value.error = error instanceof Error ? error.message : 'An unknown error occurred'
    } finally {
      coachState.value.isLoading = false
    }
  }

  async function deleteCoach(id: string): Promise<void> {
    coachState.value.isLoading = true
    try {
      await coachHttpService.deleteCoach(id)
      coachState.value.coaches = coachState.value.coaches.filter((coach) => coach.id !== id)
    } catch (error) {
      coachState.value.error = error instanceof Error ? error.message : 'An unknown error occurred'
    } finally {
      coachState.value.isLoading = false
    }
  }

  function resetErrorState(): void {
    coachState.value.error = undefined
  }

  return {
    coachState,
    isLoading,
    coaches,
    selectedCoach,
    addFilter,
    removeFilter,
    activeFilters,
    error,
    createCoach,
    deleteCoach,
    getAllCoaches: fetchCoaches,
    resetErrorState,
  }
})
