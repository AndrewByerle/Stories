<script setup lang="ts">
import Welcome from "./views/Welcome.vue";
import Storyboard from "./views/Storyboard.vue";
import Loading from "./views/Loading.vue";

import useFirebase from "./firebase/firebase";
import { onMounted, ref } from "vue";
const { isLoggedIn } = useFirebase();

const showSignup = ref(false);
const loading = ref(true);

onMounted(async () => {
  showSignup.value = !(await isLoggedIn.value);
  loading.value = false;
});
</script>

<template>
  <template v-if="loading">
    <Loading msg="Loading..." />
  </template>
  <template v-else-if="showSignup">
    <Welcome msg="Stories" />
  </template>
  <template v-else>
    <Storyboard msg="Stories" />
  </template>
</template>

<style scoped></style>
