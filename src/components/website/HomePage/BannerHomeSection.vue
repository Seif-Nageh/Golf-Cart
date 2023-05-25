<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div
    class="bg-cover bg-no-repeat bg-center py-36"
    style="background-image: url('./banner-bg.jpg')"
  >
    <div class="container text-gray-100">
      <h1 class="text-6xl font-medium mb-4 capitalize">
        best collection for <br />
        home decoration
      </h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br />
        accusantium perspiciatis, sapiente magni eos dolorum ex quos
      </p>
      <div class="mt-12">
        <RouterLink
          to="/products"
          class="bg-primary-400 border border-primary-400 text-white px-8 py-3 font-medium hover:bg-primary-700 transition-all"
          >Shop Now</RouterLink
        >
      </div>
    </div>
  </div>
</template>
