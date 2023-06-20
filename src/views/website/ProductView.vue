<script setup>
import { watch, ref } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import OneProductSection from "@/components/website/OneProductSection.vue";
import AskForPrice from "@/components/website/AskForPrice.vue";

import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const products = ref([]);

let productModelNumber;

async function getData() {
  const response = await global.apiCallMethod(
    `Product/GetLastFour?companyId=1`
  );
  if (response.status == 200) {
    products.value = response.data;
  }
}

getData();

function getModelNumber(num) {
  productModelNumber = num;
}
</script>

<template>
  <OneProductSection @modelNumber="getModelNumber" />

  <!-- Ask For Price -->

  <AskForPrice
    id="askForPrice"
    title="Ask For Price"
    :subject="productModelNumber"
  />

  <!-- ./Ask For Price -->

  <!-- related product -->
  <ProductsSection
    class="pt-12"
    title="Related products"
    :products="products"
  ></ProductsSection>

  <!-- ./related product -->
</template>
