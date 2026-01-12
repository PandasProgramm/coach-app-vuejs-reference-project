<script setup lang="ts"></script>

<template>
  <div class="is-loading-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.is-loading-container {
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  p {
  }
}
</style>
