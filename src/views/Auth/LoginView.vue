<script setup>
import { reactive, ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import CheckboxComponent from "@/components/dashboard/form/CheckboxComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import loadingTextComponent from "@/components/loadingTextComponent.vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const form = ref({
  email: "",
  password: "",
  checkbox: false,
});
const toggle = reactive({
  alert: false,
  button: false,
});

async function formSubmit(e) {
  toggle.button = true;
  let formData = new FormData();
  formData.append("emailOrUserName", form.value.email);
  formData.append("password", form.value.password);

  // Add Method
  const response = await global.apiCallMethod(
    `Security/Login`,
    "post",
    formData,
    {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "x-api-key": "ByYM000OLlMQG6VVVp1OH7Xzyr7gEuw1qvUC5dcGt3SNM",
    }
  );
  if (response.status == 200) {
    global.user = response.data;
    if (form.value.checkbox) {
      $cookies.set("user", response.data);
    }
    router.replace({ name: "dashboard.home" });
  } else {
    toggle.alert = true;
    toggle.button = false;
  }
}
function alertClose() {
  toggle.alert = false;
}
</script>

<template>
  <ErrorAlertComponent @alertClose="alertClose" v-if="toggle.alert">
    <template #body>Your Email Or Password Wrong !!</template>
  </ErrorAlertComponent>
  <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
    <h3 class="relative z-10 text-5xl font-bold text-primary-400 bg-clip-text">
      Welcome back
    </h3>
    <p class="mb-0 text-gray-400">Enter your email and password to sign in</p>
  </div>
  <div class="flex-auto p-6">
    <form @submit.prevent="formSubmit">
      <div class="mb-6">
        <TextInputComponent
          v-model:inputValue="form.email"
          inputName="Email or UserName"
          isRequired
        />
      </div>
      <div class="mb-6">
        <TextInputComponent
          v-model:inputValue="form.password"
          inputName="Password"
          inputType="password"
          isRequired
        />
      </div>
      <div class="min-h-6 mb-0.5 block">
        <CheckboxComponent
          inputName="Remember me"
          v-model:inputValue="form.checkbox"
        />
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn-primary w-full bg-primary-400"
          :disabled="toggle.button"
        >
          <loadingTextComponent content="Sign in" :toggle="toggle.button" />
        </button>
      </div>
    </form>
  </div>
</template>
