<script setup>
const props = defineProps(["rows", "headers"]);
</script>

<template>
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
        <template v-if="rows < 1">
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-primary-50"
            v-for="n of 5"
            :key="n"
          >
            <td class="px-6 py-4" v-for="header of headers" :key="header">
              <div role="status" class="max-w-sm animate-pulse">
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                ></div>
                <span class="sr-only">Loading...</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <div role="status" class="max-w-sm animate-pulse">
                <div
                  class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
                ></div>
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        </template>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-primary-50"
          v-for="(row, index) of rows"
          :key="index"
        >
          <td class="px-6 py-4" v-for="header of headers" :key="header">
            <img
              v-if="row[header] == row.imageUrl"
              :src="row.imageUrl"
              alt=""
            />
            <template v-if="row[header] != row.imageUrl">
              {{ row[header] }}
            </template>
          </td>
          <td class="px-6 py-4 text-right">
            <slot name="actions"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
