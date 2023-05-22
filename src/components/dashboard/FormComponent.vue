<script setup>
import { ref } from "vue";

const props = defineProps([
  "inputs",
  "isAddNew",
  "name",
  "categoryName",
  "imageUrl",
]);

defineEmits([
  "formSubmit",
  "update:name",
  "update:categoryName",
  "update:imageUrl",
]);
</script>
<template>
  <form @submit.prevent="$emit('formSubmit')" enctype="multipart/form-data">
    <div class="mb-6" v-for="input of inputs" :key="input.name">
      <label
        :for="input.modifer"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {{ input.name }}
      </label>
      <select
        v-if="input.isSelect"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        @input="$emit(`update:${input.modifer}`, $event.target.value)"
        :value="input.isSelect ? props[input.modifer] : ''"
      >
        <!-- :value="props[input.modifer]" -->
        <option selected disabled>{{ input.selectDefault }}</option>
        <option
          :value="select.id"
          v-for="select of input.categories"
          :key="select.name"
        >
          {{ select.name }}
        </option>
      </select>
      <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :type="input.type"
        :id="input.modifer"
        :placeholder="input.name"
        :required="input.required"
        :value="input.type != 'file' ? props[input.modifer] : ''"
        @input="$emit(`update:${input.modifer}`, $event.target.value)"
        v-else
      />
    </div>
    <button
      type="submit"
      class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {{ isAddNew ? "Create" : "Edit" }}
    </button>
  </form>
</template>
