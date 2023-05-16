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
    <div class="p-4 mt-14 sm:ml-64 min-h-screen">
      <RouterView />
    </div>
  </div>
</template>
