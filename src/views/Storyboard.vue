<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div>
        <h1 class="title is-1 is-large is-spaced">{{ msg }}</h1>
        <p class="subtitle is-4">You Are now Logged In</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
