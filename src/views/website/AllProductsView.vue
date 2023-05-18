<script setup>
import { ref } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const products = ref([]);

async function getData() {
  const res = await fetch(`${global.globalApi}Product/GetAllProducts`);
  const finalRes = await res.json();
  products.value = finalRes.data;
}

getData();
</script>

<template>
  <ProductsSection
    title="All Products"
    :products="products"
    class="pt-6"
  ></ProductsSection>
</template>
