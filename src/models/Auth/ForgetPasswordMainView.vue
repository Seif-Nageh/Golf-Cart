<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
    <h3 class="relative z-10 text-5xl font-bold text-primary-400 bg-clip-text">
      Forget Password
    </h3>
    <p class="mb-0 text-gray-400">Don't worry we got it</p>
  </div>
  <div class="flex-auto p-6">
    <RouterView />
  </div>
</template>
