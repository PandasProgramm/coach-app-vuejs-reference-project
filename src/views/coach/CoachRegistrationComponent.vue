<script setup lang="ts">

  import BaseCardComponent from "@/components/BaseCardComponent.vue";
  import {computed, ref} from "vue";
  import {type Coach, CoachingFocus} from "@/domain/Coach.ts";
  import {onBeforeRouteLeave, type Router, useRouter} from "vue-router";
  import {useCoachStore} from "@/stores/coach-store/CoachStore.ts";
  import { v4 as uuidv4 } from 'uuid';

  onBeforeRouteLeave( (_to, _from,next) => {
    if(isFormEdited.value) {
      const shouldLeave = confirm('Are you sure you want to leave?')
      next(shouldLeave)
    }
    next()
  });

  const firstName = ref<string>('');
  const lastName = ref<string>('');
  const birthday = ref<string>('');
  const city = ref<string>('');
  const email = ref<string>('');
  const description = ref<string>('');
  const rating = ref<number>(0);
  const coasts = ref<number>(0);
  const coachingFocusList = ref<CoachingFocus[]>([]);
  const coachStore = useCoachStore();
  const isFormEdited = computed(() => {
    return firstName.value.trim() !== '' || lastName.value.trim() !== '' || email.value.trim() !== '' || city.value.trim() !== '' || description.value.trim() !== '' || rating.value !== 0 || coachingFocusList.value.length !== 0;
  })


  function resetForm() {
    firstName.value = '';
    lastName.value = '';
    birthday.value = '';
    city.value = '';
    email.value = '';
    description.value = '';
    rating.value = 0;
    coasts.value = 0;
    coachingFocusList.value = [];
  }

  const router: Router = useRouter();

  async function onSubmit(): Promise<void> {
    console.log(firstName.value, lastName.value, email.value, birthday.value, city.value, description.value, rating.value, coachingFocusList.value)
    const birthdayAsString = birthday?.value ?? '';
    const id = uuidv4().toString();
    const coachToCreate: Coach = {
      id,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthday: birthdayAsString,
      city: city.value,
      description: description.value,
      rating: rating.value,
      coasts: coasts.value,
      coachingFocus: coachingFocusList.value,
      image: ''
    }

    await coachStore.createCoach(coachToCreate);

    resetForm()
    router.push('/coaches');
  }

</script>

<template>
  <base-card-component>
    <div class="register-container">
      <h3>Coach Registration</h3>
      <form @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="firstName">First Name</label>
          <input v-model="firstName" type="text" id="firstName" name="firstName" placeholder="First Name"/>
        </div>
        <div class="form-control">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" type="text" id="lastName" name="lastName" placeholder="Last Name"/>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="birthday">Birthday</label>
          <input type="date" id="birthday" name="birthday" v-model="birthday" />
        </div>
        <div class="form-control">
          <label for="city">City</label>
          <input type="text" id="city" name="city" placeholder="City" v-model="city"/>
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea class="text-area" id="description" name="description" placeholder="Description" v-model="description"/>
        </div>
        <div class="form-control">
          <label for="rating">Rating</label>
          <input type="number" id="rating" name="rating" placeholder="Rating" v-model="rating" max="5" min="0"/>
        </div>
        <div class="form-control">
          <label for="coasts">costs</label>
          <input type="number" id="coasts" name="coasts" placeholder="coasts" v-model="coasts" />
        </div>
        <div class="form-control">
          <label>Coaching Focus</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="coachingFocusList" :value="CoachingFocus.FRONTEND" name="coachingFocus"/>
              Frontend
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="coachingFocusList" :value="CoachingFocus.BACKEND" name="coachingFocus"/>
              Backend
            </label>
            <label class="checkbox-label">
              <input type="checkbox" v-model="coachingFocusList" :value="CoachingFocus.CAREER" name="coachingFocus"/>
              Career
            </label>
          </div>
        </div>
<!--        <div class="form-control">-->
<!--          <label for="profile-image">Profile Image</label>-->
<!--          <input type="file" id="profile-image" name="profile-image"/>-->
<!--        </div>-->
        <div class="btn-container">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>

  </base-card-component>
</template>

<style scoped>
    .register-container {
      display: grid;
      justify-content: center;
      h3 {
        text-align: center;
        margin-bottom: 2rem;
      }
      form {
        width: 30rem;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: center;

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

          input:not([type="checkbox"]) {
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

              input[type="checkbox"] {
                cursor: pointer;
              }
            }
          }
        }

        .btn-container {
          grid-column: 2;
          display: flex;
          justify-content: end;
        }
      }
    }
</style>
