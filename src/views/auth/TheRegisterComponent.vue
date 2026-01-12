<script setup lang="ts">
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const formControls = [
  {
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'Enter your email',
    modelValue: 'email',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    modelValue: 'password',
  },
]
</script>

<template>
  <base-card-component>
    <form>
      <div class="form-control" v-for="control in formControls" :key="control.id">
        <label :for="control.id">{{ control.label }}</label>
        <input :type="control.type" :id="control.id" :placeholder="control.placeholder" />
      </div>
      <button-component>
        <div class="btn-container">
          <button type="submit">Sign up</button>
        </div>
      </button-component>
    </form>
  </base-card-component>
</template>

<style scoped></style>
