import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const websiteLink = ref("https://back-aide.quetech.net/");
  const globalApi = ref("https://back-aide.quetech.net/api/");
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
  // Api Call Method
  async function apiCallMethod(
    apiEndPoint,
    method = "get",
    data = {},
    headers = {}
  ) {
    let finalRes = [];
    await axios({
      url: `${globalApi.value}${apiEndPoint}`,
      method: method,
      data: data,
      headers: headers,
    })
      .then((response) => {
        // Handle the response
        // console.log(response);
        finalRes = response.data;
      })
      .catch((error) => {
        // Handle the error
        // console.error(error);
        finalRes = error;
      });
    return finalRes;
  }

  return { globalApi, websiteLink, colors, apiCallMethod };
});
