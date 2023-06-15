<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/website/NavBar.vue";
import NavHeader from "@/components/website/NavHeader.vue";
import FooterBar from "@/components/website/FooterBar.vue/";
import WhatsappButton from "@/components/WhatsappButton.vue";
</script>

<template>
  <!-- header -->
  <NavHeader></NavHeader>
  <!-- ./header -->

  <!-- navbar -->
  <NavBar></NavBar>
  <!-- ./navbar -->

  <RouterView />
  <WhatsappButton />
  <FooterBar></FooterBar>
</template>
