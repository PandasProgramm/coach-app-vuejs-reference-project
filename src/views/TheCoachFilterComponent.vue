<script setup lang="ts">
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import { useCoachStore } from '@/stores/coach-store/CoachStore.ts'
import { ref } from 'vue'
import { CoachingFocus } from '@/domain/Coach.ts'
const coachStore = useCoachStore()

const focusOptions = [
  { id: 'frontend', value: CoachingFocus.FRONTEND, label: 'Frontend' },
  { id: 'backend', value: CoachingFocus.BACKEND, label: 'Backend' },
  { id: 'career', value: CoachingFocus.CAREER, label: 'Career' },
]
</script>

<template>
  <base-card-component>
    <h3>Find Your Coach</h3>
    <div class="filter-group">
      <span v-for="option in focusOptions" :key="option.id">
        <input
          type="checkbox"
          :id="option.id"
          :value="option.value"
          v-model="coachStore.activeFilters"
        />
        <label :for="option.id">{{ option.label }}</label>
      </span>
    </div>
  </base-card-component>
</template>

<style scoped></style>
