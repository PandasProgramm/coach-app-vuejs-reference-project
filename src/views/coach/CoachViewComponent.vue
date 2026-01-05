<script setup lang="ts">
import {type Coach, CoachingFocus} from "@/domain/Coach.ts";
  import BaseCardComponent from "@/components/BaseCardComponent.vue";
import ChipComponent from "@/components/ChipComponent.vue";
import {useCoachStore} from "@/stores/coach-store/CoachStore.ts";

  const properties = defineProps<{ coach: Coach }>()
  const coachStore = useCoachStore()
  const focusColor = (coachFocus: CoachingFocus) => {
    switch (coachFocus) {
      case CoachingFocus.BACKEND:
        return 'green';
      case CoachingFocus.CAREER:
        return 'blue';
      case CoachingFocus.FRONTEND:
        return 'red';
      default:
        return 'pink';
    }
  }

  function onDeleteCoach(coach: Coach) {
    coachStore.deleteCoach(coach.id)
  }

</script>

<template>
  <base-card-component>
    <div class="coach-container">
      <div class="header-container">
        <h4>{{ properties.coach.firstName }} {{ properties.coach.lastName }}</h4>
        <button class="btn-remove" @click="onDeleteCoach(properties.coach)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#7f10aa" d="M6 20V6H5V5h4v-.77h6V5h4v1h-1v14zm1-1h10V6H7zm2.808-2h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" stroke-width="0.6" stroke="#7f10aa"/></svg>
        </button>
      </div>
      <div class="details">
        <div class="rating">{{ coach.rating + '€' }}</div>
        <div class="chip-container">
          <chip-component v-for="focus in properties.coach.coachingFocus"
                          :key="focus"
                          :style="{'background-color': focusColor(focus)}">
            <span> {{ focus }} </span>
          </chip-component>
        </div>
      </div>
    </div>
  </base-card-component>
</template>

<style scoped>

  .coach-container {
    font-family: Arial, Gadget, sans-serif;
    margin-top: 1rem;

    .header-container {
      display: flex;
      justify-content: space-between;

      .btn-remove {
        background: transparent;
        border: none;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .details {

      .rating {
        font-weight: bold;
      }

      .chip-container {
        padding-right: .6rem;
        padding-top: .6rem;
        padding-bottom: .6rem;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }

</style>
