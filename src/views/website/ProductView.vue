<script setup>
import { ref } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import OneProductSection from "@/components/website/OneProductSection.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const products = ref([]);

async function getData() {
  const response = await global.apiCallMethod(
    `Product/GetLastFive?companyId=1`,
    "get",
    {},
    {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    }
  );
  if (response.status == 200) {
    products.value = response.data;
  }
}

getData();
</script>

<template>
  <OneProductSection :id="$route.params.id"></OneProductSection>
  <!-- related product -->
  <ProductsSection
    title="Related products"
    :products="products"
  ></ProductsSection>

  <!-- ./related product -->
</template>
