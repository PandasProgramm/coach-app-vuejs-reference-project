<script setup lang="ts">
import TheHeaderComponent from "@/views/TheHeaderComponent.vue";
</script>

<template>
  <the-header-component/>
  <main>
    <router-view/>
  </main>
</template>

<style lang="scss">

  body, html {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

</style>
