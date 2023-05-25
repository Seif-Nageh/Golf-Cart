<script setup>
import { ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import loadingTextComponent from "@/components/loadingTextComponent.vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const form = ref({
  verifyCode: "",
  isEmailUpdated: null,
});

const toggle = reactive({
  alert: false,
  button: false,
});

async function formSubmit(e) {
  toggle.button = true;

  let formData = new FormData();
  formData.append("email", $cookies.get("userEmail"));
  formData.append("verifyCode", form.value.verifyCode);

  // Add Method
  const response = await global.apiCallMethod(
    `Security/VerifyEmail`,
    "post",
    formData,
    {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  if (response.status == 200) {
    router.replace({ name: "resetPassword" });
    toggle.button = false;
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
  <ErrorAlertComponent
    @alertClose="alertClose"
    v-if="toggle.alert"
    class="fixed bottom-0 right-4"
  >
    <template #body>Sorry Something Went Wrong !!</template>
  </ErrorAlertComponent>
  <form @submit.prevent="formSubmit">
    <div class="mb-6">
      <TextInputComponent
        v-model:inputValue="form.verifyCode"
        inputName="Verify OTP Code"
        inputType="number"
        inputPlaceHolder="OTP Code"
        isRequired
      />
    </div>
    <div class="text-center">
      <button type="submit" class="btn-primary w-full bg-primary-400">
        <loadingTextComponent
          content="Reset Password Code"
          :toggle="toggle.button"
        />
      </button>
    </div>
  </form>
</template>
