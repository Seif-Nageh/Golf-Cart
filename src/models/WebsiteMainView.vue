<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/website/NavBar.vue";
import NavHeader from "@/components/website/NavHeader.vue";
import FooterBar from "@/components/website/FooterBar.vue/";
import WhatsappButton from "@/components/WhatsappButton.vue";
import { reactive } from "vue";

const toggle = reactive({
  search: false,
  menu: false,
});

function searchToggle() {
  toggle.search = !toggle.search;
  toggle.menu = false;
}

function menuToggle() {
  toggle.menu = !toggle.menu;
  toggle.search = false;
}

function clickOut() {
  toggle.search = false;
  toggle.menu = false;
}
</script>

<template>
  <!-- header -->
  <NavHeader @searchClick="searchToggle" @menuClick="menuToggle" />
  <!-- ./header -->

  <!-- navbar -->
  <NavBar
    :searchToggle="toggle.search"
    :menuToggle="toggle.menu"
    @clickOut="clickOut"
  />
  <!-- ./navbar -->

  <RouterView />
  <WhatsappButton />
  <FooterBar />
</template>
