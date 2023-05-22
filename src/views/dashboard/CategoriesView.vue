<script setup>
import TableComponent from "@/components/dashboard/TableComponent.vue";
import FormComponent from "@/components/dashboard/FormComponent.vue";
import { ref } from "vue";

import { useGlobalStore } from "@/stores/global";
const global = useGlobalStore();

const categories = ref([]);

let headers = ref(["name", "image", "subCategories"]);

const inputs = ref([]);

async function getData() {
  const res = await fetch(`${global.globalApi}Category/GetAll`);
  const finalRes = await res.json();
  categories.value = finalRes.data;
  headers = Object.keys(finalRes.data[0]);
}

getData();
</script>

<template>
  <!-- Modal toggle -->

  <div class="flex">
    <button
      id="categoryModalButton"
      type="button"
      class="my-5 ms-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Add New
    </button>
  </div>
  <TableComponent :rows="categories" :headers="headers">
    <template #actions>
      <button
        id="categoryModalButton"
        data-modal-toggle="categoryModal"
        type="button"
        class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
      >
        Edit
      </button>
    </template>
  </TableComponent>
</template>
