import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
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
  },

  actions: {
    async getData() {
      const res = await fetch(`${this.globalApi}SubCategory/GetAll`);
      const finalRes = await res.json();
      // subCategories.value = finalRes.data;
      // headers = Object.keys(finalRes.data[0]);
      return finalRes.data;
    },
  },
});
