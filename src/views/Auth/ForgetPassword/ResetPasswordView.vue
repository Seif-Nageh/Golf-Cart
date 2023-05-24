<script setup>
import { ref } from "vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import router from "@/router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const form = ref({
  password: "",
});

async function formSubmit(e) {
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
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    }
  );
  if (response.status == 200) {
    console.log(response);
    global.user = response.data;
    router.replace({ name: "login" });
  } else {
    console.error(response);
  }
}
</script>

<template>
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
        Update Password
      </button>
    </div>
  </form>
</template>
