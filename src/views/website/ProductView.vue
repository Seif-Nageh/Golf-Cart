<script setup>
import { ref } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import OneProductSection from "@/components/website/OneProductSection.vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const route = useRoute();
const id = route.params.id;

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
  <OneProductSection :prodId="id"></OneProductSection>
  <!-- related product -->
  <ProductsSection
    title="Related products"
    :products="products"
  ></ProductsSection>

  <!-- ./related product -->
</template>
