<script setup>
import { ref } from "vue";

const socialLinks = ref([
  {
    url: "https://wa.me/966580006668",
    icon: "fa-whatsapp",
  },
  {
    url: "https://www.facebook.com/people/%D9%90Aide-Carts/100063922600020/",
    icon: "fa-facebook",
  },
  {
    url: "https://www.instagram.com/mohd.hadi.est/",
    icon: "fa-instagram",
  },
  {
    url: "https://twitter.com/cartlivtong",
    icon: "fa-twitter",
  },
]);
</script>

<template>
  <div class="flex space-x-3">
    <a
      :href="link.url"
      class="text-primary-400"
      target="_blank"
      v-for="link of socialLinks"
      :key="link.icon"
    >
      <font-awesome-icon :icon="`fa-brands ${link.icon}`" />
    </a>
  </div>
</template>
