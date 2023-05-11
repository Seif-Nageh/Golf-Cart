<script setup>
import { ref } from "vue";
import ProductsSection from "../../components/website/ProductsSection.vue";
import OneProductSection from "../../components/website/OneProductSection.vue";

const products = ref([
  {
    id: 1,
    name: "sofa",
    imageUrl: "/product1.jpg",
    productDesc: "adsadsads",
    price: 55,
    color: 5,
  },
  {
    id: 2,
    name: "bed",
    imageUrl: "/product2.jpg",
    productDesc: "dasdsad",
    price: 55,
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
  {
    id: 4,
    name: "golf cart",
    imageUrl: "/product3.jpg",
    price: 55,
    productDesc: "",
    color: 5,
  },
]);
</script>

<template>
  <OneProductSection></OneProductSection>
  <!-- related product -->
  <ProductsSection
    title="Related products"
    :products="products"
  ></ProductsSection>

  <!-- ./related product -->
</template>
