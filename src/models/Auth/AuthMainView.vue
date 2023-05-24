<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12"
  >
    <div
      class="relative flex flex-col min-w-0 mt-16 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
    >
      <RouterView />
    </div>
  </div>
</template>
