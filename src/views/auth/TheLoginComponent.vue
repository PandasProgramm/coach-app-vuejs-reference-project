<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: ''
})

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

function onLogin() {
  const email  = formData.value.email
  const password = formData.value.password
  if (email === '' || password === '' || password.length < 7) {
    console.log('Email or password cannot be empty')
    return
  }
  console.log('Login form submitted', formData.value)
}
</script>

<template>
  <base-card-component>
    <form @submit.prevent="onLogin()">
      <div class="form-control" v-for="control in formControls" :key="control.id">
        <label :for="control.id">{{ control.label }}</label>
        <input :type="control.type" :id="control.id" :placeholder="control.placeholder" v-model.trim="formData[control.modelValue as 'email' | 'password']"/>
      </div>
      <button-component>
        <div class="btn-container">
          <router-link to="/auth/register">Sign up</router-link>
          <button type="submit" @click="onLogin">Sign In</button>
        </div>
      </button-component>
    </form>
  </base-card-component>
</template>

<style scoped>
.form-control {
  display: grid;
  gap: 1rem;

  label {
    font-weight: bold;
    text-align: left;
    padding-right: 1rem;
    margin-bottom: 0.2rem;
  }

  input {
    margin-bottom: 2rem;
  }
}

.btn-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  justify-items: right;
}
</style>
