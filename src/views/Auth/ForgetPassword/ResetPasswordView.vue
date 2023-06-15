<script setup>
import { ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import loadingTextComponent from "@/components/loadingTextComponent.vue";

import router from "@/router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const form = ref({
  password: "",
});

const toggle = reactive({
  alert: false,
  button: false,
});

function alertClose() {
  toggle.alert = false;
}

async function formSubmit(e) {
  toggle.button = true;
  let formData = new FormData();
  formData.append("emailOrUserName", $cookies.get("userEmail"));
  formData.append("password", form.value.password);

  // Add Method
  const response = await global.apiCallMethod(
    `Security/ResetPassword`,
    "post",
    formData,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  if (response.status == 200) {
    global.user = response.data;
    router.replace({ name: "login" });
    toggle.button = true;
  } else {
    toggle.alert = true;
    toggle.button = false;
  }
}
</script>

<template>
  <ErrorAlertComponent
    class="fixed bottom-0 z-40 left-5"
    @alertClose="alertClose"
    v-if="toggle.alert"
  >
    <template #body>Your Email Or Password Wrong !!</template>
  </ErrorAlertComponent>
  <form @submit.prevent="formSubmit">
    <div class="mb-6">
      <TextInputComponent
        v-model:inputValue="form.password"
        inputName="New Password"
        inputType="password"
        isRequired
      />
    </div>
    <div class="text-center">
      <button type="submit" class="btn-primary w-full bg-primary-400">
        <loadingTextComponent
          content="Update Password"
          :toggle="toggle.button"
        />
      </button>
    </div>
  </form>
</template>
