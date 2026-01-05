<script setup lang="ts">

</script>

<template>
  <div class="chip-container">
    <slot></slot>
  </div>
</template>

<style scoped>
  .chip-container {
    display: inline-block;
    text-align: center;
    line-height: 25px;
    padding: 0 8px;
    border-radius: 25px;
    width: 7rem;
  }
</style>
