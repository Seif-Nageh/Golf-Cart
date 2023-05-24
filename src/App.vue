<script setup>
import { RouterView } from "vue-router";
import LoadingModalComponent from "./components/LoadingModalComponent.vue";
</script>

<template>
  <!-- <LoadingModalComponent></LoadingModalComponent> -->
  <div class="min-h-screen">
    <RouterView />
  </div>
</template>
