<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const categories = ref([]);

async function getData() {
  const response = await global.apiCallMethod(`Category/GetAll`);
  if (response.status == 200) {
    categories.value = response.data;
  } else {
    console.log(response);
  }
}

getData();
</script>
<template>
  <div class="container py-16">
    <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
      shop by category
    </h2>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
      <div
        class="relative rounded-sm overflow-hidden group"
        v-for="category of categories"
        :key="category"
      >
        <img
          :src="category.imageUrl"
          :alt="category.name"
          class="w-full aspect-[3/4]"
        />
        <div
          class="absolute inset-0 bg-primary-400 bg-opacity-40 flex flex-col items-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
        >
          <span class="pt-4">{{ category.name }}</span>
          <RouterLink to="/products" class="my-auto"> See Products </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
