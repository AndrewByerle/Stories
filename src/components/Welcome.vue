<script setup lang="ts">
defineProps<{ msg: string }>();
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <h1 class="title is-1 is-large">{{ msg }}</h1>
    </div>
  </section>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
