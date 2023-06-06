<script setup>
import { RouterView } from "vue-router";
// import LoadingModalComponent from "./components/LoadingModalComponent.vue";
import { SocialChat } from "vue-social-chat";

const attendants = [
  {
    app: "whatsapp",
    label: "Technical support",
    name: "Naif Abdallah",
    number: "5581983383532",
    avatar: {
      src: "https://avatars0.githubusercontent.com/u/8084606?s=460&u=20b6499a416cf7129a18e5c168cf387e159edb1a&v=4",
      alt: "",
    },
  },
];
</script>

<template>
  <!-- <LoadingModalComponent></LoadingModalComponent> -->
  <div class="min-h-screen">
    <RouterView />
    <SocialChat icon :attendants="attendants">
      <template #header>
        <p>Click on one of our attendants below to chat on WhatsApp.</p>
      </template>
      <template #button>
        <font-awesome-icon size="2xl" :icon="`fa-brands fa-whatsapp`" />
      </template>
      <template #footer>
        <small>Opening hours: 8am to 6pm</small>
      </template>
    </SocialChat>
  </div>
</template>
