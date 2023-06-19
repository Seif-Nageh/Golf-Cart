<script setup>
import { RouterLink } from "vue-router";
import SocialMedia from "./SocialMedia.vue";

const emits = defineEmits(["searchClick", "menuClick"]);
</script>

<template>
  <header class="shadow-sm bg-white">
    <div class="container flex items-center justify-between">
      <RouterLink to="/" class="w-5/6 pr-2 md:w-fit">
        <img
          src="@/assets/images/logo.jpeg"
          alt="Logo"
          class="h-12"
          loading="lazy"
        />
      </RouterLink>
      <div class="visible md:invisible flex justify-between w-1/6">
        <font-awesome-icon
          icon="magnifying-glass"
          @click="$emit('searchClick')"
        />
        <font-awesome-icon
          icon="fa-solid fa-bars"
          @click="$emit('menuClick')"
        />
      </div>
      <div class="sm:flex items-center space-x-4 hidden">
        <div
          class="flex items-center justify-between md:pl-12 text-primary-500"
        >
          <a href="tel:0966580006668" target="_blank" class="pe-5">
            <font-awesome-icon icon="fa-solid fa-phone" class="me-2" />
            +966580006668
          </a>
        </div>
        <SocialMedia></SocialMedia>
      </div>
    </div>
  </header>
</template>
