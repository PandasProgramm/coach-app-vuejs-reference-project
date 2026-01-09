import { computed, ref } from 'vue'
import { CoachingFocus } from '@/domain/Coach.ts'
import { useCoachStore } from '@/stores/coach-store/CoachStore.ts'
import { useRouter } from 'vue-router'
import type { CoachToCreate } from '@/domain/CoachToCreate.ts'
import { coachValidationService } from '@/service/CoachValidationService.ts'

export interface FormErrors {
  firstName: string
  lastName: string
  email: string
  birthday: string
  city: string
  description: string
  coachingFocus: string
}

export function useCoachForm() {
  const coachStore = useCoachStore()
  const router = useRouter()

  const firstName = ref<string>('')
  const lastName = ref<string>('')
  const birthday = ref<string>('')
  const city = ref<string>('')
  const email = ref<string>('')
  const description = ref<string>('')
  const rating = ref<number>(0)
  const coasts = ref<number>(0)
  const coachingFocusList = ref<CoachingFocus[]>([])

  const apiError = ref<string | undefined>( undefined)

  const errors = ref<FormErrors>({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    city: '',
    description: '',
    coachingFocus: '',
  })

  const formFields = computed(() => [
    { id: 'firstName', label: 'First Name', type: 'text', model: firstName },
    { id: 'lastName', label: 'Last Name', type: 'text', model: lastName },
    { id: 'email', label: 'Email', type: 'email', model: email },
    { id: 'birthday', label: 'Birthday', type: 'date', model: birthday },
    { id: 'city', label: 'City', type: 'text', model: city },
    { id: 'rating', label: 'Rating', type: 'number', model: rating, min: 0, max: 5 },
    { id: 'coasts', label: 'Costs', type: 'number', model: coasts },
  ])

  const isFormEdited = computed(() => {
    return (
      firstName.value.trim() !== '' ||
      lastName.value.trim() !== '' ||
      email.value.trim() !== '' ||
      city.value.trim() !== '' ||
      description.value.trim() !== '' ||
      rating.value !== 0 ||
      coachingFocusList.value.length !== 0
    )
  })

  function validate(): boolean {
    errors.value = {
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      city: '',
      description: '',
      coachingFocus: '',
    }

    let isValid = true

    if (!coachValidationService.isValidLength(firstName.value, 6)) {
      errors.value.firstName = 'First name must be at least 6 characters long.'
      isValid = false
    }
    if (!coachValidationService.isValidLength(lastName.value, 6)) {
      errors.value.lastName = 'Last name must be at least 6 characters long.'
      isValid = false
    }
    if (!coachValidationService.isValidEmail(email.value)) {
      errors.value.email = 'Please enter a valid email address.'
      isValid = false
    }
    if (!coachValidationService.isValidLength(city.value, 5)) {
      errors.value.city = 'City must be at least 5 characters long.'
      isValid = false
    }
    if (!coachValidationService.isValidLength(description.value, 50)) {
      errors.value.description = 'Description must be at least 50 characters long.'
      isValid = false
    }

    const birthCheck = coachValidationService.isAtLeast18(birthday.value)
    if (!birthCheck.isValid) {
      errors.value.birthday = birthCheck.message ?? ''
      isValid = false
    }

    if (coachingFocusList.value.length === 0) {
      errors.value.coachingFocus = 'Please select at least one coaching focus.'
      isValid = false
    }

    return isValid
  }

  function resetForm() {
    firstName.value = ''
    lastName.value = ''
    birthday.value = ''
    city.value = ''
    email.value = ''
    description.value = ''
    rating.value = 0
    coasts.value = 0
    coachingFocusList.value = []
  }

  async function submitForm() {
    apiError.value = undefined
    if (!validate()) return

    try {
      const coachToCreate: CoachToCreate = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        birthday: birthday.value,
        city: city.value,
        description: description.value,
        rating: rating.value,
        coasts: coasts.value,
        coachingFocus: coachingFocusList.value,
        image: '',
      }

      await coachStore.createCoach(coachToCreate)
      resetForm()
      await router.push('/coaches')
    } catch (e) {
      apiError.value = e instanceof Error ? e.message : 'An unknown error occurred'
    }
  }

  return {
    description,
    coachingFocusList,
    formFields,
    isFormEdited,
    submitForm,
    errors,
    apiError,
    isLoading: coachStore.isLoading,
  }
}
