<script setup lang="ts">
import { onMounted } from "vue";
import useFirebase from "../firebase/firebase";

defineProps<{ msg: string }>();
const { signOutUser, fetchRedirectResult } = useFirebase();

onMounted(() => {
  fetchRedirectResult();
});
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div>
        <h1 class="title is-1 is-large is-spaced">{{ msg }}</h1>
        <p class="subtitle is-4">You Are now Logged In</p>
        <button @click="signOutUser">sign out</button>
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
