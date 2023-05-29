<script setup>
const props = defineProps([
  "inputValue",
  "inputName",
  "isRequired",
  "inputPlaceHolder",
  "inputType",
]);

const emits = defineEmits(["update:inputValue"]);
</script>

<template>
  <div class="mb-6">
    <label
      :for="inputName"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ inputName }}
    </label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :type="inputType || 'text'"
      :id="inputName"
      :placeholder="inputPlaceHolder || inputName"
      :required="isRequired"
      @input="$emit('update:inputValue', $event.target.value)"
      :value="inputValue"
    />
  </div>
</template>
