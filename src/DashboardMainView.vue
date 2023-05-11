<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/dashboard/NavBar.vue";
import SideBar from "@/components/dashboard/SideBar.vue";
</script>

<template>
  <div class="bg-gray-100">
    <!-- Aside -->
    <SideBar></SideBar>
    <!-- ./Aside -->

    <!-- navbar -->
    <NavBar></NavBar>
    <!-- ./navbar -->

    <RouterView />
  </div>
</template>
