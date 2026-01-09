<script setup lang="ts"></script>

<template>
  <div class="btn">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
:slotted(button),
:slotted(a) {
  background-color: $btn-background-color;
  border: 2px solid $btn-border-color;
  color: $btn-color;
  font-weight: $btn-font-weight;
  font-family: $btn-font-family;
  font-size: $btn-font-size;
  cursor: pointer;
  padding: 0.55rem 1.5rem;
  border-radius: 30px;
  display: inline-block;
  text-decoration: none;
  width: 8rem;
}
:slotted(button):hover,
:slotted(a):hover {
  background-color: $btn-background-color-active;
  color: $btn-color-active;
}
</style>
