<script setup>
import { ref } from "vue";

const socialLinks = ref([
  {
    url: "#",
    icon: "fa-whatsapp",
  },
  {
    url: "#",
    icon: "fa-facebook",
  },
  {
    url: "#",
    icon: "fa-instagram",
  },
  {
    url: "#",
    icon: "fa-twitter",
  },
]);
</script>

<template>
  <div class="flex space-x-3">
    <a
      :href="link.url"
      class="text-primary-400"
      v-for="link of socialLinks"
      :key="link.icon"
    >
      <font-awesome-icon :icon="`fa-brands ${link.icon}`" />
    </a>
  </div>
</template>
