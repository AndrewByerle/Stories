<script setup lang="ts">
defineProps<{ msg: string }>();

import { onMounted } from "vue";
import useFirebase from "../firebase/firebase";
import GoogleSignInButton from "../components/GoogleSignInButton.vue";

const { signInWithGoogle } = useFirebase();

onMounted(() => {});
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div>
        <h1 class="title is-1 is-large is-spaced">{{ msg }}</h1>
        <p class="subtitle is-4">Document your life</p>
        <GoogleSignInButton @sign-in-with-google="signInWithGoogle" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.center-space-between {
  justify-content: space-between;
  display: flex;
}
</style>
