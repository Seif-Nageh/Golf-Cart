<script setup>
import { RouterView } from "vue-router";
import WhatsappButton from "./components/WhatsappButton.vue";
// import LoadingModalComponent from "./components/LoadingModalComponent.vue";
</script>

<template>
  <!-- <LoadingModalComponent></LoadingModalComponent> -->
  <div class="min-h-screen">
    <RouterView />
    <WhatsappButton />
  </div>
</template>
