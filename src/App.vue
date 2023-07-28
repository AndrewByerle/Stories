<script setup lang="ts">
import Welcome from "./components/Welcome.vue";
import useFirebase from "./firebase/firebase";

const { isLoggedIn } = useFirebase();

console.log(isLoggedIn.value);
</script>

<template>
  <Welcome msg="Stories" />
</template>

<style scoped></style>
