<script setup>
import SocialMedia from "@/components/website/SocialMedia.vue";
import { ref } from "vue";

const navLinks = ref([
  {
    name: "Home",
    link: "",
  },
  {
    name: "Products",
    link: "products",
  },
  {
    name: "About us",
    link: "about-us",
  },
  {
    name: "Contact us",
    link: "contact-us",
  },
]);
</script>

<template>
  <!-- footer -->
  <footer class="bg-black py-12 text-white text-base">
    <div class="container flex flex-wrap justify-center items-center">
      <div class="w-full lg:w-1/2">
        <img
          src="@/assets/images/logo.jpeg"
          alt="logo"
          class="w-30"
          loading="lazy"
        />
        <div class="my-8 pr-4 flex justify-between">
          <p>
            Golf-Car Mohamed hadi eljahni trading Establishment the company
            started in JEDDAH, SAUDI ARABIA. The business continued to grow and
            became an exclusive Club Car Distributorship representing Club Car
            Golf Cars.
          </p>
        </div>
      </div>
      <div class="flex flex-wrap justify-evenly w-full lg:w-1/2">
        <div class="flex flex-wrap justify-evenly md:gap-8 w-full">
          <RouterLink
            v-for="navLink of navLinks"
            :key="navLink.name"
            :to="`/${navLink.link}`"
            class="text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-white"
          >
            {{ navLink.name }}
          </RouterLink>
        </div>
        <div class="w-full flex justify-center items-center mt-8">
          <SocialMedia />
        </div>
      </div>
    </div>
  </footer>
  <!-- ./footer -->
</template>
