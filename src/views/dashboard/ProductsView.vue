<script setup>
import { ref } from "vue";
import TableComponent from "@/components/dashboard/TableComponent.vue";

let isAddNew = ref(true);

const headers = ["name", "color", "category", "description", "image", "price"];

const products = [
  {
    id: 1,
    name: "Product 1",
    color: 0,
    category: "car",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    color: 0,
    category: "car",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/200",
    price: 100,
  },
];

// let pro = {
//   id: 0,
//   name: "",
//   color: 0,
//   category: "",
//   description: "",
//   image: "",
//   price: 0,
// };
const inputs = [
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: false,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
  {
    id: "name",
    name: "Your email",
    value: "Your email",
    placeholder: "name@flowbite.com",
    required: true,
  },
];
</script>

<template>
  <TableComponent
    :rows="products"
    :headers="headers"
    :inputs="inputs"
    modelName="Products"
  ></TableComponent>
</template>
