<script setup lang="ts">
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import { useRequestStore } from '@/stores/request-store/RequestStore.ts'
import { useCoachStore } from '@/stores/coach-store/CoachStore.ts'
import { computed, onMounted } from 'vue'

const requestStore = useRequestStore()
const coachStore = useCoachStore()
const requests = computed(() => requestStore.requests)

function findCoachName(coachId: string): string {
  const coach = coachStore.selectedCoach(coachId)
  return coach ? coach.firstName + ' ' + coach.lastName : 'Unknown Coach'
}


onMounted(async () => {
  await requestStore.fetchAll()
})

</script>

<template>
  <base-card-component>
    <div class="request-container">
      <h3>Requests</h3>
      <template v-for="request in requests" :key="request.id">
        <base-card-component>
          <div class="request-details" @click.stop>
            <span>{{ request.email }}</span>
            <div>{{ request.message }}</div>
            <div>{{ 'For Coach: ' + findCoachName(request.coachId) }}</div>
            <button @click="requestStore.deleteRequest(request.id)">Delete</button>
          </div>
        </base-card-component>
      </template>
    </div>
  </base-card-component>
</template>

<style scoped>
.request-container {
  display: grid;

  h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .request-details {
    display: grid;
    width: 100%;
    grid-template-columns: 3fr auto;
    grid-template-rows: auto auto auto;
    gap: 0.5rem;

    span,
    div {
      grid-column: 1;
    }

    button {
      grid-column: 2;
      grid-row: 1;
      background: transparent;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
