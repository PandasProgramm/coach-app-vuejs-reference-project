<script setup lang="ts">
  import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
  import { computed, type ComputedRef, ref } from 'vue'
  import { useRequestStore } from '@/stores/request-store/RequestStore.ts'
  import ButtonComponent from '@/components/ButtonComponent.vue'
  import BaseCardComponent from '@/components/BaseCardComponent.vue'
  import type { RequestToCreate } from '@/domain/RequestToCreate.ts'

  const route = useRoute()
  const router = useRouter()
  const requestStore = useRequestStore()

  const coachId = computed(() => route.params.id as string)
  const email = ref<string>('')
  const message = ref<string>('')

  onBeforeRouteLeave((_to, _from, next) => {
    if (email.value !== '' || message.value !== '') {
      const response = confirm('Are u sure to leave ? unsaved changes')
      next(response)
    }
    next()
  })

  const isFormValid: ComputedRef<boolean> = computed(() => email.value === '' || message.value === '')

  function onsubmit() {
    const request: RequestToCreate = {
      coachId: coachId.value,
      email: email.value,
      message: message.value,
    }
    requestStore.createRequest(request).then(() => {
      email.value = ''
      message.value = ''
      router.push('/coaches')
    })
  }
</script>

<template>
  <base-card-component>
    <form @submit.prevent="onsubmit()">
      <div class="form-control">
        <label for="email">email</label>
        <input type="email" id="email" placeholder="your email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="message">message</label>
        <textarea id="message" placeholder="your message" v-model="message" />
      </div>
      <button-component>
        <button type="submit" :disabled="isFormValid">send</button>
      </button-component>
    </form>
  </base-card-component>
</template>

<style scoped>
form {
  padding: 1rem;
  .form-control {
    display: grid;
    margin-bottom: 1rem;

    textarea {
      margin-top: 1rem;
      resize: none;
      height: 10rem;
      width: 100%;
    }
  }
}
</style>
