<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/dashboard/NavBar.vue";
import SideBar from "@/components/dashboard/SideBar.vue";
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Aside -->
    <SideBar></SideBar>
    <!-- ./Aside -->

    <!-- navbar -->
    <NavBar></NavBar>
    <!-- ./navbar -->
    <div class="p-4 pt-14 sm:ml-64">
      <RouterView />
    </div>
  </div>
</template>
