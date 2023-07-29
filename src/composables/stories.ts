import { Ref, ref } from "vue";
import { Story } from "../definitions/types";

const useStories = () => {
  const stories: Ref<Story[]> = ref([]);

  return { stories };
};

export default useStories;
