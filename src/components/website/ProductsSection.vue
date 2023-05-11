<script setup>
import { ref } from "vue";
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
        class="bg-white shadow rounded overflow-hidden group"
        v-for="product of products"
        :key="product.name"
      >
        <div class="relative">
          <img :src="product.imageUrl" :alt="product.name" class="w-full" />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          >
            <RouterLink
              :to="`/product/${product.id}`"
              class="text-white text-lg w-9 h-8 rounded-full bg-primary-400 flex items-center justify-center hover:bg-gray-800 transition"
              title="view product"
            >
              <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
            </RouterLink>
          </div>
        </div>
        <div class="pt-4 pb-3 px-4">
          <RouterLink :to="`/product/${product.id}`">
            <h4
              class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary-400 transition"
            >
              {{ product.name }}
            </h4>
            <p>{{ product.productDesc }}</p>

            <div class="flex items-baseline mb-1 space-x-2">
              <p class="text-xl text-primary font-semibold">
                ${{ product.price }}
              </p>
            </div>
          </RouterLink>
        </div>
        <RouterLink
          :to="`/product/${product.id}`"
          class="block w-full py-1 text-center text-white bg-primary-400 border border-primary-400 rounded-b hover:bg-transparent hover:text-primary-400 transition"
        >
          Preview
        </RouterLink>
      </div>
    </div>
  </div>
  <!-- ./product -->
</template>
