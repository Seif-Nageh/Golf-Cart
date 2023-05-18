<script setup>
import CategoryHomeSection from "../../components/website/HomePage/CategoryHomeSection.vue/";
import FeaturesHomeSection from "../../components/website/HomePage/FeaturesHomeSection.vue";
import ProductsSection from "../../components/website/ProductsSection.vue";
import BannerHomeSection from "../../components/website/HomePage/BannerHomeSection.vue";
import { ref } from "vue";
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
  <!-- banner -->
  <BannerHomeSection></BannerHomeSection>
  <!-- ./banner -->

  <!-- features -->
  <FeaturesHomeSection></FeaturesHomeSection>
  <!-- ./features -->

  <!-- categories -->
  <CategoryHomeSection></CategoryHomeSection>
  <!-- ./categories -->

  <!-- product -->
  <ProductsSection
    title="recomended for you"
    :products="products"
  ></ProductsSection>
  <!-- ./product -->
</template>
