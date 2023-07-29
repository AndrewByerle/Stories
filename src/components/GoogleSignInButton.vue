<template>
  <button @click="emit('signInWithGoogle')" class="sign-in-button">
    <div class="center">
      <GoogleIcon />
      <div class="center-column ml-1">Sign up with Google</div>
    </div>
  </button>
</template>

<script setup lang="ts">
import GoogleIcon from "../components/icons/GoogleIcon.vue";
const emit = defineEmits(["signInWithGoogle"]);
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.center-column {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.sign-in-button {
  border-radius: 100px;
  border: none;
}
</style>
