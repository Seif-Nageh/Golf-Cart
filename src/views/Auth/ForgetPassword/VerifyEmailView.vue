<script setup>
import { ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const form = ref({
  verifyCode: "",
  isEmailUpdated: null,
});

async function formSubmit(e) {
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
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    }
  );
  if (response.status == 200) {
    console.log(response);
    router.replace({ name: "resetPassword" });
  } else {
    console.error(response);
  }
}
</script>

<template>
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
        Reset Password Code
      </button>
    </div>
  </form>
</template>
