<script setup>
import { ref, reactive } from "vue";
import { RouterLink } from "vue-router";

import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";

import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const alertMessage = ref("");

let toggle = reactive({ alert: false });

const searchData = ref("");

function alertClose() {
  toggle.alert = false;
}

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

const searchProducts = ref([]);

const searchDropdown = ref(false);

async function getData() {
  const response = await global.apiCallMethod("Category/GetAll?companyId=1");
  if (response.status == 200) {
    categories.value = response.data;
  } else {
    toggle.alert = false;
    alertMessage.value = "";
    toggle.alert = true;
  }
}

getData();

async function formSubmit(e) {
  console.log(searchData);
  const response = await global.apiCallMethod(
    `Product/Search?searchParam=${searchData.value}`
  );

  if (response.status == 200) {
    searchProducts.value = response.data;
    searchDropdown.value = true;
  } else {
    toggle.alert = false;
    alertMessage.value = "";
    toggle.alert = true;
  }
}
</script>

<template>
  <ErrorAlertComponent
    @alertClose="alertClose"
    v-if="toggle.alert"
    class="fixed bottom-0 z-40 left-5"
  >
    <template #body>
      <span v-if="alertMessage.length > 0">{{ alertMessage }}</span>
      <span v-else>
        Sorry Somthing Went Wrong !!<br />Please try again later
      </span>
    </template>
  </ErrorAlertComponent>
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
          class="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible max-h-60 overflow-auto z-50"
        >
          <RouterLink
            :to="{
              name: 'productsByCategory',
              params: { categoryId: category.id },
            }"
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
        <label
          class="absolute left-6 top-1/4 text-lg text-gray-400 hidden md:inline"
          for="search"
        >
          <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
        </label>
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchData"
          @input="formSubmit"
          class="w-full ms-auto border border-primary-400 border-r-0 pl-12 py-3 pr-3 focus:ring-0 focus:ring-primary-500 focus:outline-none hidden md:flex"
          placeholder="Search Here"
        />
        <div
          class="z-10 bg-white divide-y divide-gray-100 shadow w-full absolute top-full max-h-60 overflow-auto"
          v-if="searchDropdown"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li
              v-for="product of searchProducts"
              :key="product.name"
              @click="searchDropdown = false"
            >
              <RouterLink
                :to="{ name: 'product', params: { id: product.id } }"
                class="flex items-center px-4 py-2 overflow-hidden hover:bg-primary-300 hover:text-white"
              >
                <img
                  :src="`${global.websiteLink}Resources/Images/${product.imageUrl}`"
                  alt="product.name"
                  class="w-1/3 mr-3"
                  loading="lazy"
                />
                {{ product.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
