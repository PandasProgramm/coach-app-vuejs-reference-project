<script setup lang="ts"></script>

<template>
  <div class="form-control">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.form-control {
  display: contents;

  label {
    font-weight: bold;
    text-align: left;
    padding-right: 1rem;
  }

  .text-area {
    resize: none;
    height: 5rem;
  }

  input:not([type='checkbox']) {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .checkbox-group {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: normal;
      cursor: pointer;

      input[type='checkbox'] {
        cursor: pointer;
      }
    }
  }
}
</style>
