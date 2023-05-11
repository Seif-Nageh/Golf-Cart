<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global.js";

const global = useGlobalStore();
const product = ref({
  id: 1,
  name: "sofa",
  imageUrl: "/product1.jpg",
  productDesc: "adsadsads",
  price: 55,
  color: 2,
});
const productColor = global.colors;
</script>

<template>
  <!-- product-detail -->
  <div class="container grid grid-cols-2 gap-6 pb-16">
    <div>
      <img :src="product.imageUrl" alt="product" class="w-full" />
    </div>

    <div class="flex flex-col justify-center">
      <h2 class="text-3xl font-medium uppercase mb-2">{{ product.name }}</h2>
      <div class="space-y-2">
        <p class="text-gray-800 font-semibold space-x-2">
          <span>Availability: </span>
          <span class="text-green-600">In Stock</span>
        </p>
        <p class="space-x-2">
          <span class="text-gray-800 font-semibold">Category: </span>
          <span class="text-gray-600">Sofa</span>
        </p>
      </div>
      <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
        <p class="text-xl text-primary font-semibold">
          SAR {{ product.price }}
        </p>
      </div>

      <p class="mt-4 text-gray-600">
        {{ product.productDesc }}
      </p>

      <div class="pt-4">
        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
        <div class="flex items-center gap-2">
          <div class="color-selector">
            <input
              type="radio"
              name="color"
              :id="productColor[product.color].name"
              class="hidden"
            />
            <label
              :for="productColor[product.color].name"
              class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
              :style="{ 'background-color': productColor[product.color].hexa }"
            ></label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ./product-detail -->

  <!-- description -->
  <!-- <div class="container pb-16">
    <h3
      class="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium"
    >
      Product details
    </h3>
    <div class="w-3/5 pt-6">
      <div class="text-gray-600">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          necessitatibus deleniti natus dolore cum maiores suscipit optio itaque
          voluptatibus veritatis tempora iste facilis non aut sapiente dolor
          quisquam, ex ab.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quae
          accusantium voluptatem blanditiis sapiente voluptatum. Autem ab,
          dolorum assumenda earum veniam eius illo fugiat possimus illum dolor
          totam, ducimus excepturi.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia
          modi ut expedita! Iure molestiae labore cumque nobis quasi fuga,
          quibusdam rem? Temporibus consectetur corrupti rerum veritatis numquam
          labore amet.
        </p>
      </div>

      <table
        class="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6"
      >
        <tr>
          <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
            Color
          </th>
          <th class="py-2 px-4 border border-gray-300">Blank, Brown, Red</th>
        </tr>
        <tr>
          <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
            Material
          </th>
          <th class="py-2 px-4 border border-gray-300">Latex</th>
        </tr>
        <tr>
          <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
            Weight
          </th>
          <th class="py-2 px-4 border border-gray-300">55kg</th>
        </tr>
      </table>
    </div>
  </div> -->
  <!-- ./description -->
</template>
