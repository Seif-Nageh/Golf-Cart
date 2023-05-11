<script setup>
import { ref } from "vue";
import ProductsSection from "../../components/website/ProductsSection.vue";

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
    color: 5,
    price: 55,
  },
  {
    id: 3,
    name: "golf cart",
    imageUrl: "/product3.jpg",
    price: 55,
    productDesc: "",
    color: 5,
  },
  {
    id: 4,
    name: "golf cart",
    imageUrl: "/product3.jpg",
    productDesc: "",
    price: 55,
    color: 5,
  },
]);
</script>

<template>
  <ProductsSection title="All Products" :products="products"></ProductsSection>
</template>
