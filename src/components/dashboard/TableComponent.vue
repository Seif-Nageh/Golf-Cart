<script setup>
import { ref } from "vue";
import FormComponent from "@/components/dashboard/FormComponent.vue";
import { Modal } from "flowbite-vue";

const props = defineProps(["rows", "headers", "inputs", "modelName"]);

const isShowModal = ref(false);

let isAddNew = ref(true);

function showModal(id = 0, createNew = true) {
  isAddNew = createNew ? true : false;

  isShowModal.value = true;

  // let filteredProduct =
  //   id != 0 ? products.filter((prod) => prod.id == id) : [pro];
  // pro = filteredProduct[0];
}

function closeModal() {
  isShowModal.value = false;
}
</script>

<template>
  <div class="flex">
    <button
      @click="showModal()"
      type="button"
      class="my-5 ms-auto text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Add New
    </button>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-primary-50 dark:bg-primary-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="header of headers"
            :key="header"
          >
            {{ header }}
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-primary-50"
          v-for="(row, index) of rows"
          :key="index"
        >
          <td class="px-6 py-4" v-for="header of headers" :key="header">
            {{ row[header] }}
          </td>
          <td class="px-6 py-4 text-right">
            <button
              @click="showModal(row.id, false)"
              type="button"
              class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Edit
            </button>
            <Modal size="2xl" v-if="isShowModal" @close="closeModal">
              <template #header>
                <div class="flex items-center text-lg">
                  {{
                    isAddNew ? "Create New " + modelName : "Edit " + modelName
                  }}
                </div>
              </template>
              <template #body>
                <FormComponent
                  :inputs="inputs"
                  :isAddNew="isAddNew"
                ></FormComponent>
              </template>
            </Modal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
