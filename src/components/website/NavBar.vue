<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const navLinks = ref([
  {
    name: "Home",
    link: "",
  },
  {
    name: "Products",
    link: "products",
  },
  {
    name: "About us",
    link: "about-us",
  },
  {
    name: "Contact us",
    link: "contact-us",
  },
]);

const categories = ref([]);

async function getData() {
  const res = await fetch(`${global.globalApi}Category/GetAll`);
  const finalRes = await res.json();
  categories.value = finalRes.data;
}

getData();
</script>

<template>
  <nav class="bg-gray-800 z-50">
    <div class="container flex justify-between">
      <div
        class="px-8 py-4 bg-primary-400 md:flex items-center cursor-pointer relative group hidden"
      >
        <span class="text-white">
          <font-awesome-icon icon="bars"></font-awesome-icon>
        </span>
        <span class="capitalize ml-2 text-white">All Categories</span>
        <!-- dropdown -->
        <div
          class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible"
        >
          <RouterLink
            to="/"
            class="flex items-center justify-center px-6 py-3 hover:bg-gray-100 transition text-clip"
            v-for="category of categories"
            :key="category.name"
          >
            <span class="text-gray-600 text-sm">{{ category.name }}</span>
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center justify-between xl``:pl-12 py-5">
        <div class="flex items-center space-x-3 xl:space-x-8 capitalize">
          <RouterLink
            v-for="navLink of navLinks"
            :key="navLink.name"
            :to="`/${navLink.link}`"
            class="text-gray-200 hover:text-primary-300 text-sm sm:text-base transition"
            exact-active-class="text-primary-400"
          >
            {{ navLink.name }}
          </RouterLink>
        </div>
      </div>

      <div class="max-w-xl relative hidden lg:flex">
        <span
          class="absolute left-6 top-1/4 text-lg text-gray-400 hidden md:inline"
        >
          <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
        </span>
        <input
          type="text"
          name="search"
          id="search"
          class="w-2/3 ms-auto border border-primary-400 border-r-0 pl-12 py-3 pr-3 focus:ring-0 focus:ring-primary-500 focus:outline-none hidden md:flex"
          placeholder="Search Here"
        />
        <button
          class="bg-primary-400 border border-primary-400 text-white px-8 hover:bg-primary-700 transition hidden md:flex md:items-center"
        >
          Search
        </button>
      </div>
    </div>
  </nav>
</template>
