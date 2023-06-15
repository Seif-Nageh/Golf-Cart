<script setup>
import { RouterView } from "vue-router";
import LoadingModalComponent from "./components/LoadingModalComponent.vue";
import { onUpdated, ref } from "vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

onUpdated(() => {
  initFlowbite();
});

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
