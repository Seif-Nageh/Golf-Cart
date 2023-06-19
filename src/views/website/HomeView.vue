<script setup>
import CategoryHomeSection from "@/components/website/HomePage/CategoryHomeSection.vue/";
import FeaturesHomeSection from "@/components/website/HomePage/FeaturesHomeSection.vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import AskForPrice from "@/components/website/AskForPrice.vue";
import BannerHomeSection from "@/components/website/HomePage/BannerHomeSection.vue";
import ContactUsView from "./ContactUsView.vue";
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const products = ref([]);

async function getData() {
  const response = await global.apiCallMethod(
    `Product/GetLastFour?companyId=1`
  );

  if (response.status == 200) {
    products.value = response.data;
  }
}

getData();
</script>
<template>
  <!-- banner -->
  <BannerHomeSection />
  <!-- ./banner -->

  <!-- features -->
  <FeaturesHomeSection />
  <!-- ./features -->

  <!-- categories -->
  <CategoryHomeSection />
  <!-- ./categories -->

  <!-- product -->
  <ProductsSection title="recomended for you" :products="products" />
  <!-- ./product -->

  <!-- contact us -->
  <ContactUsView />
  <!-- ./contact us -->

  <AskForPrice title="Get in touch" />
</template>
