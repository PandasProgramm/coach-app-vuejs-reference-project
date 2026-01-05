<script setup lang="ts">

    import {computed, onMounted} from "vue";
    import {useCoachStore} from "@/stores/coach-store/CoachStore.ts";
    import BaseCardComponent from "@/components/BaseCardComponent.vue";
    import CoachViewComponent from "@/views/coach/CoachViewComponent.vue";

    const coachStore = useCoachStore()
    const coaches = computed(() => coachStore.coaches);

    function initialLoad() {
      return coachStore.coaches.length === 0;
    }

    onMounted(() => {
      if (initialLoad()) {
        coachStore.getAllCoaches()
      }
    })

</script>

<template>
  <div class="container">
    <base-card-component >
      <div class="header-container">
          <h3>Coach List</h3>
          <router-link to="/register">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24">
              <path fill="none" stroke="#9a25c6" stroke-linecap="round" stroke-width="1.5"
                    d="M15 12h-3m0 0H9m3 0V9m0 3v3m10-3c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"/>
            </svg>
          </router-link>
      </div>
      <div class="coach-container" v-for="coach in coaches" :key="coach.id">
        <coach-view-component :coach="coach"/>
      </div>
    </base-card-component>

  </div>
</template>

<style scoped>
  .container {
    display: grid;
    grid-template-rows: auto 1fr;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .header-container {
    display: grid;
    grid-template-columns: 11fr 1fr;
    width: 100%;

    h4 {
      grid-column: 1;
      margin: 0;
    }

    a {
      grid-column: 2;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }

</style>
