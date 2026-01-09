<script setup lang="ts">
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCoachStore } from '@/stores/coach-store/CoachStore.ts'
const route = useRoute()
const coachStore = useCoachStore()
const coachId = computed(() => route.params.id as string)
const selectedCoach = coachStore.selectedCoach(coachId.value)
</script>

<template>
  <base-card-component v-if="selectedCoach">
    <h3>{{ 'Coach details from  ' + selectedCoach.firstName + ' ' + selectedCoach.lastName }}</h3>
    <div class="details">
      <span> {{ selectedCoach.birthday }}</span>
      <span> {{ selectedCoach.city }}</span>
      <span> {{ selectedCoach.email }}</span>
    </div>
    <p>{{ selectedCoach.description }}</p>
    <div class="rating">{{ selectedCoach.rating }}</div>
  </base-card-component>
</template>

<style scoped>
  .details {
    display: flex;
    flex-direction: column;
  }
</style>
