<script setup lang="ts">
import TheHeaderComponent from "@/views/TheHeaderComponent.vue";
import { computed } from 'vue'
import { useRequestStore } from '@/stores/request-store/RequestStore.ts'
import { useCoachStore } from '@/stores/coach-store/CoachStore.ts'
import TheLoadingComponent from '@/views/TheLoadingComponent.vue'

const requestStore = useRequestStore()
const coachStore = useCoachStore()
const isLoading = computed(() => requestStore.isLoading || coachStore.isLoading)
</script>

<template>
  <the-header-component/>
  <main>
    <router-view/>
  </main>
  <teleport to="body">
    <the-loading-component v-if="isLoading"/>
  </teleport>
</template>

<style lang="scss">

  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

</style>
