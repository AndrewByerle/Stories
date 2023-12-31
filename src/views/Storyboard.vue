<script setup lang="ts">
import { Ref, nextTick, onMounted, ref } from "vue";
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
const storyContainerRef = ref();

const addStory = () => {
  const newStory: Story = {
    date: new Date(),
    text: currentInput.value,
    tags: tags.value,
  };
  stories.value.push(newStory);

  if (stories.value.length > 5) {
    nextTick(() => {
      storyContainerRef.value.scrollLeft = 9999;
    });
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const displayStoryText = (content: string) => {
  // limits total text displayed on card
  const maxLength = 30;
  let shortenedContent = content;
  if (content.length > maxLength) {
    shortenedContent = content.substring(0, maxLength) + "...";
  }
  return shortenedContent;
};
</script>

<template>
  <section class="hero is-fullheight is-oxford-blue">
    <div class="hero-body center">
      <div class="columns is-mobile scroll" ref="storyContainerRef">
        <template v-for="story in stories" :key="story.id">
          <div
            class="column is-one-third-mobile is-one-fifth-desktop is-one-fifth-tablet"
          >
            <div class="card">
              <div class="card-content">
                <p>
                  {{ formatDate(story.date) }}
                </p>
                <div class="is-hidden-mobile">
                  <p>
                    {{ displayStoryText(story.text) }}
                  </p>
                </div>
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
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Add Tags" />
          </div>
          <div class="control">
            <div class="select">
              <select class="has-background-light">
                <option>.com</option>
                <option>.edu</option>
              </select>
            </div>
          </div>
        </div>
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
