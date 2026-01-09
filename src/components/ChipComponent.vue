<script setup lang="ts"></script>

<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
  .container {
    display: inline-block;
    text-align: center;
    line-height: 25px;
    padding: 5px 8px 5px 8px;
    border-radius: 25px;
    width: 7rem;
    font-size: 12px;
    font-weight: bold;
  }
</style>
