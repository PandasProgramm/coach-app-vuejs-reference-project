<script setup lang="ts">

</script>

<template>
<div class="container">
  <slot></slot>
</div>
</template>

<style scoped>
  .container {
    margin-right: 15rem;
    margin-left: 15rem;
    margin-top: 2rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
