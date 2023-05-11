<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const mainCategories = ref([
  {
    name: "sofa",
    imageUrl: "/category-1.jpg",
  },
  {
    name: "bed",
    imageUrl: "/category-2.jpg",
  },
  {
    name: "golf cart",
    imageUrl: "/category-3.jpg",
  },
]);
</script>

<template>
  <div class="container py-16">
    <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
      shop by category
    </h2>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div
        class="relative rounded-sm overflow-hidden group"
        v-for="category of mainCategories"
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
