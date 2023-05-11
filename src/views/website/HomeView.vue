<script setup>
import CategoryHomeSection from "../../components/website/HomePage/CategoryHomeSection.vue/";
import FeaturesHomeSection from "../../components/website/HomePage/FeaturesHomeSection.vue";
import ProductsSection from "../../components/website/ProductsSection.vue";
import BannerHomeSection from "../../components/website/HomePage/BannerHomeSection.vue";
import { ref } from "vue";
const products = ref([
  {
    id: 1,
    name: "sofa",
    imageUrl: "/product1.jpg",
    productDesc: "",
    price: 55,
    color: 5,
  },
  {
    id: 2,
    name: "bed",
    imageUrl: "/product2.jpg",
    price: 55,
    productDesc: "",
    color: 5,
  },
  {
    id: 3,
    name: "golf cart",
    imageUrl: "/product3.jpg",
    productDesc: "",
    price: 55,
    color: 5,
  },
]);
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
