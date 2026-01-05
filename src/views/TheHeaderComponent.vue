<script setup lang="ts">

</script>

<template>
  <header>
    <div class="container">
      <h2>Find a Coach</h2>
      <div class="btn-container">
        <router-link to="/coaches">All Coaches</router-link>
        <router-link to="/request">Requests</router-link>
      </div>
    </div>
  </header>

</template>

<style lang="scss" scoped>
  .container {
    margin: 0;
    padding: 1.5rem 2.5rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(1, 1fr);
    color: $text-color-header;

    h2 {
      margin: 0;
      grid-column: 1 / span 3;
    }

    .btn-container {
      grid-column: 9 / span 4;
      display: flex;
      align-items: center;
      height: 2rem;
      .router-link-active {
        border: 1px solid $border-color-active;
        color: $text-color-active;
        text-decoration: underline;
      }
      a {
        display: flex;
        margin-left: 2rem;
        text-decoration: none;
        background-color: transparent;
        padding: 0.5rem 1rem;
        width: 8.75rem;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        color: $text-color-header;

        &:hover {
          cursor: pointer;
          border: 1px solid white;
        }


      }


    }

    background-color: $primary-color
  }
</style>
