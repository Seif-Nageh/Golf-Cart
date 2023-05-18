import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const globalApi = ref("https://www.quetech.net/api/");
  // const xApiKey = ref("");
  const colors = ref([
    {
      name: "red",
      hexa: "#ff0000",
    },
    {
      name: "green",
      hexa: "#00ff00",
    },
    {
      name: "blue",
      hexa: "#0000ff",
    },
  ]);

  return { globalApi, colors };
});
