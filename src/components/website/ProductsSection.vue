<script setup>
import { RouterLink } from "vue-router";
import SkeletonComponent from "@/components/SkeletonComponent.vue";

import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

defineProps(["title", "products"]);
</script>

<template>
  <!-- product -->
  <div class="container pb-16">
    <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
      {{ title }}
    </h2>
    <div class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
      <template v-if="products.length > 0">
        <div
          class="bg-white border overflow-hidden p-6 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
          v-for="product of products"
          :key="product.name"
        >
          <div class="relative">
            <img
              :src="`${global.websiteLink}Resources/Images/${product.imageUrl}`"
              :alt="product.name"
              class="w-full aspect-square"
              loading="lazy"
            />
          </div>
          <div class="pt-4 pb-3">
            <h4 class="uppercase font-medium text-xl text-black truncate">
              {{ product.name }}
            </h4>
            <p class="text-base text-gray-500 truncate">
              {{ product.productDesc }}
            </p>
          </div>
          <div class="flex items-center justify-between mb-1 space-x-2">
            <div class="flex flex-col" v-if="product.price > 0">
              <p class="text-xs text-primary-400">Price</p>
              <p class="text-xl text-gray-800 font-semibold">
                SAR {{ product.price }}
              </p>
            </div>
            <div v-else>
              <RouterLink
                :to="{ name: 'product', params: { id: product.id } }"
                class="text-primary-400"
              >
                Ask For Price
              </RouterLink>
            </div>
            <RouterLink
              :to="{ name: 'product', params: { id: product.id } }"
              class="block py-2 px-10 text-center text-white bg-primary-400 hover:bg-primary-600"
            >
              View
            </RouterLink>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="bg-white border overflow-hidden p-6 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
          v-for="n of 4"
          :key="n"
        >
          <div class="relative aspect-square">
            <SkeletonComponent class="h-9" v-for="n of 5" :key="n" />
          </div>
          <div class="pt-4 pb-3">
            <h4 class="uppercase font-medium text-xl text-black">
              <SkeletonComponent />
            </h4>
            <p class="text-base text-gray-500 truncate">
              <SkeletonComponent />
            </p>
          </div>
          <div class="flex items-center justify-between mb-1 space-x-2">
            <div class="flex flex-col">
              <p class="text-xs text-primary-400">Price</p>
              <p class="text-xl text-gray-800 font-semibold">
                <SkeletonComponent />
              </p>
            </div>
            <div
              class="block py-2 px-10 text-center text-white bg-primary-400 hover:bg-primary-600 cursor-wait"
            >
              View
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- ./product -->
</template>
