import { ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", () => {
  const websiteLink = ref("https://back-aide.quetech.net/");
  const globalApi = ref(`${websiteLink.value}api/`);
  const user = ref({});
  const alert = ref(false);
  const askForPriceForm = ref({
    name: "",
    phoneNumber: "",
    email: "",
    modelNumber: "",
    inquire: "",
  });
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
        finalRes = response.data;
      })
      .catch((error) => {
        finalRes = error;
      });
    return finalRes;
  }

  return {
    globalApi,
    websiteLink,
    colors,
    user,
    alert,
    askForPriceForm,
    apiCallMethod,
  };
});
