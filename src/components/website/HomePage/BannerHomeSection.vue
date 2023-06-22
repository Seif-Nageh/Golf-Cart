<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <div class="py-16 lg:py-32 relative">
    <div
      id="default-carousel"
      class="w-full h-full absolute inset-0 -z-50"
      data-carousel="slide"
    >
      <!-- Carousel wrapper -->
      <div class="relative h-full overflow-hidden brightness-90">
        <!-- Item 1 -->
        <div class="duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Golf"
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-1.png"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out h-full" data-carousel-item>
          <img
            src="@/assets/images/FleetSlider-2.jpg"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div
      class="container pt-4 text-gray-100 backdrop-blur-sm bg-gray-800/30 md:w-1/2 md:ml-10 md:mr-auto"
    >
      <h1 class="text-6xl font-medium pb-4 capitalize">
        best collection for <br />
        Golf Carts
      </h1>
      <p class="">
        A golf cart is a small electric or gas-powered vehicle designed to
        transport golfers and their equipment around a golf course. They
        typically have a top speed of around 15-25 miles per hour and can carry
        two to four passengers
      </p>
      <div class="py-6">
        <RouterLink
          to="/products"
          class="bg-primary-400 border-0 text-white px-8 py-3 mb-4 font-medium hover:bg-primary-700"
        >
          Shop Now
        </RouterLink>
      </div>
    </div>
  </div>
</template>
