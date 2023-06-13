<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="py-36 relative">
    <!-- <img
      src="../../../assets/images/FleetSlider.png"
      alt="Hero Image"
      class="bg-cover bg-no-repeat bg-center w-full h-full absolute inset-0 -z-50"
      loading="lazy"
    /> -->

    <div
      id="default-carousel"
      class="w-full h-full absolute inset-0 -z-50"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative h-full overflow-hidden rounded-lg">
        <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="container text-gray-100">
      <h1 class="text-6xl font-medium mb-4 capitalize">
        best collection for <br />
        Golf Carts
      </h1>
      <p class="w-1/2 pr-4">
        A golf cart is a small electric or gas-powered vehicle designed to
        transport golfers and their equipment around a golf course. They
        typically have a top speed of around 15-25 miles per hour and can carry
        two to four passengers
      </p>
      <div class="mt-12">
        <RouterLink
          to="/products"
          class="bg-primary-400 border border-primary-400 text-white px-8 py-3 font-medium hover:bg-primary-700 transition-all"
        >
          Shop Now
        </RouterLink>
      </div>
    </div>
  </div>
</template>
