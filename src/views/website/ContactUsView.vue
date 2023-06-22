<script setup>
import { ref } from "vue";

import SkeletonComponent from "@/components/SkeletonComponent.vue";
import AskForPrice from "@/components/website/AskForPrice.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const abouts = ref([]);

async function getData() {
  const response = await global.apiCallMethod(
    `ContactUs/GetContactUs?companyId=1`
  );
  if (response.status == 200) {
    abouts.value = response.data;
  }
}

getData();
const map = ref(
  `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27620.83541129333!2d31.369165064380844!3d30.07687135883199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583df81720ed69%3A0xb597301dcb56aacf!2sCity%20Centre%20Almaza!5e0!3m2!1sen!2seg!4v1683640430083!5m2!1sen!2seg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
);
</script>
<template>
  <div class="container">
    <h1 class="text-2xl py-6 uppercase">contact us</h1>
  </div>

  <div class="container grid lg:grid-cols-2 gap-8 pb-8">
    <div
      v-html="map"
      class="rounded-md w-full h-full overflow-hidden flex items-center justify-center container"
    ></div>

    <div class="grid grid-flow-row gap-5">
      <div class="grid grid-cols-6 gap-2">
        <div class="flex justify-end pt-2">
          <font-awesome-icon
            class="pe-3 text-primary-500"
            icon="fa-solid fa-location-dot"
            size="xl"
          />
        </div>
        <div class="col-span-5 flex flex-col">
          <p class="font-medium py-2 text-lg">Our Office Address</p>
          <p class="text-ellipsis" v-if="abouts.address">
            {{ abouts.address }}
          </p>
          <SkeletonComponent v-else />
        </div>
      </div>
      <div class="grid grid-cols-6 gap-2">
        <div class="flex justify-end pt-2">
          <font-awesome-icon
            class="pe-3 text-primary-500"
            icon="fa-solid fa-clock"
            size="xl"
          />
        </div>
        <div class="col-span-5 flex flex-col">
          <p class="font-medium py-2 text-lg">Our Working Time</p>
          <p class="text-ellipsis" v-if="abouts.workingTime">
            {{ abouts.workingTime }}
          </p>
          <SkeletonComponent v-else />
        </div>
      </div>
      <div class="grid grid-cols-6 gap-2">
        <div class="flex justify-end pt-2">
          <font-awesome-icon
            class="pe-3 text-primary-500"
            icon="fa-solid fa-envelope"
            size="xl"
          />
        </div>
        <div class="col-span-5 flex flex-col">
          <p class="font-medium py-2 text-lg">Our Email Address</p>
          <p class="truncate" v-if="abouts.email">
            <a :href="`mailto:${abouts.email}`" target="_target">
              {{ abouts.email }}</a
            >
          </p>
          <SkeletonComponent v-else />
        </div>
      </div>
      <div class="grid grid-cols-6 gap-2">
        <div class="flex justify-end pt-2">
          <font-awesome-icon
            class="pe-3 text-primary-500"
            icon="fa-solid fa-phone"
            size="xl"
          />
        </div>
        <div class="col-span-5 flex flex-col">
          <p class="font-medium py-2 text-lg">Our Phone Number</p>
          <p class="text-ellipsis" v-if="abouts.phoneNumbers">
            <a :href="`tel:${abouts.phoneNumbers}`" target="_target">
              {{ abouts.phoneNumbers }}
            </a>
          </p>
          <SkeletonComponent v-else />
        </div>
      </div>
    </div>
  </div>
  <AskForPrice title="BE IN TOUCH" />
</template>
