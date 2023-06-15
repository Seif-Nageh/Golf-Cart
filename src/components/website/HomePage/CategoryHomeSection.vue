<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import SkeletonComponent from "../../SkeletonComponent.vue";

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
    <template v-if="categories.length > 0">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-4 container">
        <div
          class="relative rounded-sm overflow-hidden group"
          v-for="category of categories"
          :key="category"
        >
          <img
            :src="`${global.websiteLink}Resources/Images/${category.imageUrl}`"
            :alt="category.name"
            class="w-full aspect-square"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary-400 via-transparent group-hover:bg-primary-400 flex flex-col items-center justify-end text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition-all duration-200"
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
    </template>
    <template v-else>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-4 container">
        <div
          class="relative rounded-sm overflow-hidden group"
          v-for="n of 4"
          :key="n"
        >
          <div class="relative">
            <SkeletonComponent class="h-9" v-for="n of 8" :key="n" />
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-t from-primary-400 via-transparent group-hover:bg-primary-400 flex flex-col items-center justify-end text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition-all duration-200"
          >
            <span class="py-6 transition-all duration-300">
              <SkeletonComponent class="w-1/2" v-for="n of 4" :key="n" />
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
