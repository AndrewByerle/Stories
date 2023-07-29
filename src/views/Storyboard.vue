<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import useFirebase from "../firebase/firebase";
import useStories from "../composables/stories";
import { Story } from "../definitions/types";

defineProps<{ msg: string }>();
const {
  signOutUser,
  fetchRedirectResult,
  // saveStory
} = useFirebase();
const { stories } = useStories();

onMounted(() => {
  fetchRedirectResult();
});
// put in composable
const currentInput = ref("");
const tags: Ref<string[]> = ref([]);

const addStory = () => {
  const newStory: Story = {
    date: new Date(),
    text: currentInput.value,
    tags: tags.value,
  };
  stories.value.push(newStory);
};
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div class="columns is-mobile scroll">
        <template v-for="story in stories">
          <div class="column is-one-fifth">
            <div class="card">
              <div class="card-content">
                <p>
                  {{ story.text }}
                </p>
                <p>
                  {{ story.date.toLocaleDateString("en-US") }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div>
        <h1 class="title is-1 is-large is-spaced mt-6">{{ msg }}</h1>
        <p class="subtitle is-4">Create something for your future self</p>
        <textarea
          class="textarea"
          placeholder="Start Here..."
          v-model="currentInput"
        ></textarea>
        <button class="is-primary" @click="addStory">Send</button>
        <button @click="signOutUser" class="mt-6">sign out</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll {
  width: 100%;
  overflow-x: auto;
}

.card {
  max-width: 200px;
}
.center {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
