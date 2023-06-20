<script setup>
import { ref, watch } from "vue";
import { useGlobalStore } from "@/stores/global.js";
import { useRoute } from "vue-router";
import router from "../../router";

const global = useGlobalStore();

const route = useRoute();

const emits = defineEmits(["modelNumber"]);

const product = ref({});

async function getData() {
  const response = await global.apiCallMethod(`Product/${route.params.id}`);
  if (response.status == 200) {
    console.log(response);
    product.value = response.data;
    global.askForPriceForm.modelNumber = response.data.name;
  } else if (response.status == 404) {
    router.replace({ name: "notFound" });
  }
}

getData();

watch(
  () => route.params.id,
  () => {
    getData();
  }
);
</script>

<template>
  <!-- product-detail -->
  <div class="container grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
    <div class="pt-8 md:w-4/5 m-auto">
      <img
        :src="`${global.websiteLink}Resources/Images/${product.imageUrl}`"
        alt="product"
        class="w-full aspect-square shadow-md shadow-gray-600/70"
        loading="lazy"
      />
    </div>

    <div class="flex flex-col justify-center">
      <h2 class="text-3xl font-medium uppercase mb-12">{{ product.name }}</h2>
      <div class="space-y-4">
        <p class="text-gray-800 font-semibold space-x-2">
          <span>Availability: </span>
          <span class="text-green-600">In Stock</span>
        </p>
        <p
          class="text-gray-800 font-semibold space-x-2"
          v-if="product.productDesc"
        >
          <span>Description: </span>
          <span class="mt-4 text-gray-600 lg:pr-28">
            {{ product.productDesc }}
          </span>
        </p>
        <p class="space-x-2" v-if="product.modelNumber">
          <span class="text-gray-800 font-semibold">Model Number: </span>
          <span class="text-gray-600">{{ product.modelNumber }}</span>
        </p>

        <p class="text-gray-800 font-semibold space-x-2">
          <span>Price: </span>
          <span
            class="text-lg text-gray-800 font-semibold"
            v-if="product.price"
          >
            SAR {{ product.price }}
          </span>

          <button class="text-primary-400" type="button" v-else>
            Ask For Price
          </button>
        </p>
      </div>

      <!-- <div class="pt-4">
        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
        <div class="flex items-center gap-2">
          <div class="color-selector">
            <input
              type="radio"
              name="color"
              :id="product.name"
              class="hidden"
            />
            <label
              :for="product.name"
              class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
            ></label>
            :style="{ 'background-color': name }"
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
