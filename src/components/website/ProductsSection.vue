<script setup>
import { RouterLink } from "vue-router";
defineProps(["title", "products"]);
</script>

<template>
  <!-- product -->
  <div class="container pb-16">
    <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">
      {{ title }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div
        class="bg-white border overflow-hidden p-6 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
        v-for="product of products"
        :key="product.name"
      >
        <div class="relative">
          <img :src="product.imageUrl" :alt="product.name" class="w-full" />
        </div>
        <div class="pt-4 pb-3">
          <h4 class="uppercase font-medium text-xl text-black">
            {{ product.name }}
          </h4>
          <p class="text-xs text-gray-500">{{ product.productDesc }}</p>
        </div>
        <div class="flex items-center justify-between mb-1 space-x-2">
          <div class="flex flex-col">
            <p class="text-xs text-primary-400">Price</p>
            <p class="text-xl text-gray-800 font-semibold">
              ${{ product.price }}
            </p>
          </div>
          <RouterLink
            :to="{ name: 'product', params: { id: product.id } }"
            class="block py-2 px-10 text-center text-white bg-primary-400 hover:bg-primary-600"
          >
            View
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <!-- ./product -->
</template>
