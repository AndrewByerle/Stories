<script setup lang="ts">

defineProps<{ msg: string }>()

</script>

<template>
    <section class="hero is-fullheight oxford-blue">
      <div class="hero-body">
        <h1 class="title">{{ msg }}</h1>
      </div>
    </section>

</template>

<style scoped>

</style>
