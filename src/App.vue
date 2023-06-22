<script setup>
import { RouterView } from "vue-router";
import LoadingModalComponent from "./components/LoadingModalComponent.vue";
import { ref } from "vue";

const loading = ref(true);

window.addEventListener("load", () => {
  loading.value = false;
});
</script>

<template>
  <div class="min-h-screen transition-all duration-300 ease-in-out">
    <LoadingModalComponent v-if="loading"></LoadingModalComponent>
    <RouterView />
  </div>
</template>
