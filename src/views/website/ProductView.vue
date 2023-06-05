<script setup>
import { ref } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import OneProductSection from "@/components/website/OneProductSection.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const products = ref([]);

async function getData() {
  const response = await global.apiCallMethod(
    `Product/GetLastFive?companyId=1`
  );
  if (response.status == 200) {
    products.value = response.data;
  }
}

getData();
</script>

<template>
  <OneProductSection :prodId="$route.params.id"></OneProductSection>
  <!-- related product -->
  <ProductsSection
    title="Related products"
    :products="products"
  ></ProductsSection>

  <!-- ./related product -->
</template>
