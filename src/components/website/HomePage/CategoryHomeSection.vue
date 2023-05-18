<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const categories = ref([]);
async function getData() {
  const res = await fetch(`${global.globalApi}SubCategory/GetAll`);
  const finalRes = await res.json();
  categories.value = finalRes.data;
  headers = Object.keys(finalRes.data[0]);
}

getData();
</script>
<template>
  <div class="container py-16">
    <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
      shop by category
    </h2>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div
        class="relative rounded-sm overflow-hidden group"
        v-for="category of categories"
        :key="category"
      >
        <img :src="category.imageUrl" :alt="category.name" class="w-full" />
        <RouterLink
          to="/products"
          class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
          >{{ category.name }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
