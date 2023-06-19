<script setup>
import { reactive, ref } from "vue";

import TableComponent from "@/components/dashboard/TableComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

// Table Data Method
let headers = ref(["Name", "Phone", "Email", "Message"]);
let offerPrices = ref([]);

// Model Toggle Method
let toggle = reactive({
  alert: false,
  loadingButton: false,
  button: false,
});

const alertMessage = ref("");

async function getData() {
  const response = await global.apiCallMethod(`SubmitOfferPrice/Get`);

  if (response.status == 200) {
    if (response.data.length < 1) {
      toggle.alert = true;
      setInterval(() => {
        toggle.alert = false;
      }, 3000);
      toggle.loadingButton = false;
      toggle.button = true;
      alertMessage.value = "Sorry No More Data !!!!";
    }
    headers.value = Object.keys(response.data[0]);
    offerPrices.value = response.data;
  }
}

getData();

function alertClose() {
  toggle.alert = false;
}
</script>

<template>
  <div class="flex pt-12">
    <!-- Error Alert -->
    <ErrorAlertComponent
      @alertClose="alertClose"
      v-if="toggle.alert"
      class="fixed bottom-0 z-[100] left-5"
    >
      <template #body>
        <span v-if="alertMessage.length > 0">{{ alertMessage }}</span>
        <span v-else>
          Sorry Somthing Went Wrong !!<br />Please try again later
        </span>
      </template>
    </ErrorAlertComponent>
  </div>
  <!--  Table -->
  <TableComponent :rows="offerPrices" :headers="headers" actionHidden="true" />
</template>
