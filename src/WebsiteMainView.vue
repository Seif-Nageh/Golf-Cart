<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/website/NavBar.vue";
import NavHeader from "./components/website/NavHeader.vue";
import FooterBar from "./components/website/FooterBar.vue/";
</script>

<template>
  <!-- header -->
  <NavHeader></NavHeader>
  <!-- ./header -->

  <!-- navbar -->
  <NavBar></NavBar>
  <!-- ./navbar -->

  <RouterView />

  <FooterBar></FooterBar>
</template>
