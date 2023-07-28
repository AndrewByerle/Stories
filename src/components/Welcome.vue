<script setup lang="ts">
defineProps<{ msg: string }>();

import useFirebase from "../firebase/firebase";

const { signInWithGoogle } = useFirebase();
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div>
        <h1 class="title is-1 is-large is-spaced">{{ msg }}</h1>
        <p class="subtitle is-4">hi</p>
        <button @click="signInWithGoogle()">signup</button>
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
