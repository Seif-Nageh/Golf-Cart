<script setup>
import { ref } from "vue";
import { SocialChat } from "vue-social-chat";

const attendants = ref([
  {
    app: "whatsapp",
    label: "Technical support",
    name: "Naif Abdallah",
    number: "966580006668",
    avatar: {
      src: "./logo.png",
      alt: "",
    },
  },
]);
</script>

<template>
  <SocialChat icon :attendants="attendants">
    <template #header>
      <p>Click on one of our attendants below to chat on WhatsApp.</p>
    </template>
    <template #button>
      <font-awesome-icon size="2xl" :icon="`fa-brands fa-whatsapp`" />
    </template>
    <template #footer>
      <small>Opening hours: 24 hours</small>
    </template>
  </SocialChat>
</template>
