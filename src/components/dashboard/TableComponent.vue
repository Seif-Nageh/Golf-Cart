<script setup>
import SkeletonComponent from "@/components/SkeletonComponent.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const props = defineProps(["rows", "headers"]);
const emits = defineEmits(["modelEditOpen", "deleteMethod"]);
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-primary-50 dark:bg-primary-700 dark:text-gray-400"
      >
        <tr>
          <th class="p-2">No.</th>
          <th scope="col" class="p-2" v-for="header of headers" :key="header">
            {{ header }}
          </th>
          <th scope="col" class="p-2">
            <span>Actions</span>
            <!-- <span class="sr-only">Actions</span> -->
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
            <td class="px-6 py-4">
              <SkeletonComponent></SkeletonComponent>
            </td>
            <td class="px-6 py-4" v-for="header of headers" :key="header">
              <SkeletonComponent></SkeletonComponent>
            </td>
            <td class="px-6 py-4">
              <SkeletonComponent></SkeletonComponent>
            </td>
          </tr>
        </template>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 even:bg-primary-50"
          v-for="(row, index) of rows"
          :key="index"
        >
          <td class="p-2">
            {{ index + 1 }}
          </td>
          <!-- if has image & Not have value -->
          <td class="p-2" v-for="header of headers" :key="header">
            <template
              v-if="row[header] == row.imageUrl && row.imageUrl.length < 1"
            >
              No Image
            </template>

            <!-- if has image & have value -->
            <img
              class="rounded-md"
              width="60"
              height="60"
              v-else-if="row[header] == row.imageUrl"
              :src="`${global.websiteLink}Resources/Images/${row.imageUrl}`"
              :alt="row.name"
            />
            <template v-else>{{ row[header] }}</template>
          </td>
          <td class="p-2 flex items-center justify-between">
            <button
              id="categoryModalButton"
              type="button"
              @click="$emit('modelEditOpen', row, 'edit')"
              class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Edit
            </button>
            /
            <button
              id="categoryModalButton"
              type="button"
              @click="$emit('deleteMethod', row)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </button>
            <!-- <slot name="actions"></slot> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
