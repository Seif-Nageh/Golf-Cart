<script setup>
import { RouterLink } from "vue-router";
import SocialMedia from "./SocialMedia.vue";
</script>

<template>
  <header class="shadow-sm bg-white">
    <div class="container flex items-center justify-between">
      <RouterLink to="/">
        <img src="@/assets/images/logo.jpeg" alt="Logo" class="h-12" />
      </RouterLink>
      <div class="sm:flex items-center space-x-4 hidden">
        <div
          class="flex items-center justify-between md:pl-12 text-primary-500"
        >
          <a href="tel:0201151251902" target="_blank" class="pe-5">
            <font-awesome-icon icon="fa-solid fa-phone" size="" class="me-2" />
            +0201151251902
          </a>
        </div>
        <SocialMedia></SocialMedia>
      </div>
    </div>
  </header>
</template>
