<script setup>
import { ref } from "vue";
import ProductsSection from "../../components/website/ProductsSection.vue";
import OneProductSection from "../../components/website/OneProductSection.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const products = ref([]);

async function getData() {
  const res = await fetch(`${global.globalApi}Products/GetLastFive`);
  const finalRes = await res.json();
  products.value = finalRes.data;
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
