<script setup>
import { reactive, ref } from "vue";

import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

// Toggle Method
let toggle = reactive({
  alert: false,
  button: false,
});

// Form Data Method

const form = ref({
  address: "",
  arAddress: "",
  email: "",
  phoneNumbers: "",
  workingTime: "",
  arWorkingTime: "",
  locationIFrame: "",
  companyId: 1,
});

const alertMessage = ref("");

async function getContactData() {
  const response = await global.apiCallMethod(
    `ContactUs/GetContactUs?companyId=${form.value.companyId}`
  );
  if (response.status == 200) {
    form.value = { ...response.data, companyId: 1, locationIFrame: "" };
  } else {
    (alertMessage.value = ""), (toggle.alert = true);
  }
}

getContactData();

async function formSubmit(e) {
  toggle.button = true;

  // Update Method
  const response = await global.apiCallMethod(`ContactUs`, "Put", form.value, {
    Accept: "application/json",
    Authorization: `Bearer ${$cookies.get("userToken")}`,
  });
  if (response.status == 200) {
    getContactData();
    alertMessage.value = "Contact Us Updated";
    toggle.alert = true;
  } else {
    alertMessage.value = "";
    toggle.alert = true;
  }
  toggle.button = false;
}

function alertClose() {
  toggle.alert = false;
}
</script>

<template>
  <div class="flex flex-col">
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
    <p class="text-4xl pt-10">Contact Us</p>
    <form
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10"
      @submit.prevent="formSubmit"
    >
      <TextInputComponent
        v-model:inputValue="form.address"
        inputName="Address"
      />
      <TextInputComponent
        v-model:inputValue="form.arAddress"
        inputName="Arabic Address"
      />
      <TextInputComponent
        v-model:inputValue="form.email"
        inputName="Email"
        inputType="email"
      />
      <TextInputComponent
        v-model:inputValue="form.phoneNumbers"
        inputName="Phone Numbers"
      />
      <TextInputComponent
        v-model:inputValue="form.workingTime"
        inputName="Working Time"
      />
      <TextInputComponent
        v-model:inputValue="form.arWorkingTime"
        inputName="Arabic Working Time"
      />
      <TextInputComponent
        v-model:inputValue="form.locationIFrame"
        inputName="Location IFrame"
      />
      <button
        type="submit"
        class="btn-primary mx-auto col-span-2"
        :disabled="toggle.button"
      >
        <LoadingTextComponent
          class="px-6 py-4"
          content="Update"
          :toggle="toggle.button"
        />
      </button>
    </form>
  </div>
</template>
