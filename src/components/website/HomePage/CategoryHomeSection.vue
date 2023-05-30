<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const categories = ref([]);

async function getData() {
  const response = await global.apiCallMethod(`Category/GetAll`);
  if (response.status == 200) {
    for (let i = 0; i < 4; i++) {
      const element = response.data[i];
      categories.value.push(element);
    }
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
          :src="`${global.websiteLink}Resources/Images/${category.imageUrl}`"
          :alt="category.name"
          class="w-full aspect-[3/4]"
        />
        <div
          class="absolute inset-0 bg-primary-400 bg-opacity-0 flex flex-col items-center justify-end text-xl text-white font-roboto font-medium group-hover:bg-opacity-40 transition-all duration-300"
        >
          <span class="py-6 transition-all duration-300">
            {{ category.name }}
          </span>
          <RouterLink
            to="/products"
            class="my-auto border-white border p-3 text-base align-center items-center hidden group-hover:flex transition-all duration-300"
          >
            See Products
            <span class="text-2xl ps-3 pt-0.5">
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
