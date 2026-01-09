<script setup lang="ts">
import BaseCardComponent from '@/components/BaseCardComponent.vue'
import { CoachingFocus } from '@/domain/Coach.ts'
import { onBeforeRouteLeave } from 'vue-router'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useCoachForm, type FormErrors } from '@/service/coachForm'

const {
  formFields,
  description,
  coachingFocusList,
  isFormEdited,
  submitForm,
  errors,
  apiError,
  isLoading,
} = useCoachForm()

onBeforeRouteLeave((_to, _from, next) => {
  if (isFormEdited.value) {
    next(confirm('Are you sure you want to leave?'))
  } else {
    next()
  }
})
</script>

<template>
  <base-card-component>
    <div class="register-container">
      <h3>Coach Registration</h3>
      <p v-if="apiError" class="error-text">{{ apiError }}</p>

      <form @submit.prevent="submitForm">
        <template v-for="field in formFields" :key="field.id">
          <label :for="field.id">{{ field.label }}</label>
          <div class="input-wrapper">
            <input
              v-model="field.model.value"
              :type="field.type"
              :id="field.id"
              :placeholder="field.label"
              :class="{ 'input-error': (errors[field.id as keyof FormErrors] || '').length > 0 }"
            />
            <span
              v-if="(errors[field.id as keyof FormErrors] || '').length > 0"
              class="error-message"
            >
              {{ errors[field.id as keyof FormErrors] }}
            </span>
          </div>
        </template>

        <label for="description">Description</label>
        <div class="input-wrapper">
          <textarea
            id="description"
            v-model="description"
            placeholder="Description"
            :class="{ 'input-error': (errors.description || '').length > 0 }"
          />
          <span v-if="(errors.description || '').length > 0" class="error-message">
            {{ errors.description }}
          </span>
        </div>

        <label>Coaching Focus</label>
        <div class="input-wrapper">
          <div class="checkbox-group">
            <label v-for="focus in CoachingFocus" :key="focus" class="checkbox-label">
              <input type="checkbox" v-model="coachingFocusList" :value="focus" />
              {{ focus.charAt(0) + focus.slice(1).toLowerCase() }}
            </label>
          </div>
          <span v-if="(errors.coachingFocus || '').length > 0" class="error-message">
            {{ errors.coachingFocus }}
          </span>
        </div>

        <div class="btn-container">
          <ButtonComponent>
            <button type="submit" :disabled="isLoading">
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
          </ButtonComponent>
        </div>
      </form>
    </div>
  </base-card-component>
</template>

<style scoped lang="scss">
.register-container {
  display: grid;
  justify-content: center;

  h3 {
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    width: 35rem;
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.5rem 1rem;
    align-items: start;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      width: 100%;

      input,
      textarea {
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
      }

      .checkbox-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    }

    .btn-container {
      grid-column: 2;
      display: flex;
      justify-content: end;
    }
  }
}

.error-message {
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 0.1rem;
}

.input-error {
  border: 1px solid #d32f2f !important;
}

.error-text {
  color: #d32f2f;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
