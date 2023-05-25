<script setup>
import { ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const form = ref({
  email: "",
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

  // Add Method
  const response = await global.apiCallMethod(
    `Security/ForgetPassword?email=${form.value.email}`,
    "post",
    {},
    {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    }
  );
  if (response.status == 200) {
    console.log(response);
    $cookies.set("userEmail", form.value.email);
    router.replace({ name: "verifyEmail" });
    toggle.button = false;
  } else {
    toggle.alert = false;
    toggle.button = false;
    console.error(response);
  }
}
</script>

<template>
  <ErrorAlertComponent @alertClose="alertClose" v-if="toggle.alert">
    <template #body>Your Email Or Password Wrong !!</template>
  </ErrorAlertComponent>
  <form @submit.prevent="formSubmit">
    <div class="mb-6">
      <TextInputComponent
        v-model:inputValue="form.email"
        inputName="Email"
        isRequired
      />
    </div>
    <div class="text-center">
      <button type="submit" class="btn-primary w-full bg-primary-400">
        <loadingTextComponent
          content="Reset Password"
          :toggle="toggle.button"
        />
      </button>
    </div>
  </form>
</template>
