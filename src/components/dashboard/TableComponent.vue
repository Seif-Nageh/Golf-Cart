<script setup>
import SkeletonComponent from "@/components/SkeletonComponent.vue";
import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

const props = defineProps(["rows", "headers", "actionHidden"]);
const emits = defineEmits(["modelEditOpen", "deleteMethod"]);
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      v-if="rows.length > 0 && headers.length > 0"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-primary-50 dark:bg-primary-700 dark:text-gray-400"
      >
        <tr>
          <th class="p-2">No.</th>
          <template v-for="header of headers" :key="header">
            <th
              scope="col"
              class="p-2"
              v-if="
                !header.toLowerCase().includes('id') &&
                !header.toLowerCase().includes('createdby') &&
                !header.toLowerCase().includes('isdeleted')
              "
            >
              {{ header }}
            </th>
          </template>
          <th scope="col" class="p-2" v-if="!actionHidden">
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
          <template v-for="header of headers" :key="header">
            <td
              class="p-2"
              v-if="
                !header.toLowerCase().includes('id') &&
                !header.toLowerCase().includes('createdby') &&
                !header.toLowerCase().includes('isdeleted')
              "
            >
              <!-- <template
                v-if="row[header] == row.imageUrl && row.imageUrl.length < 1"
              >
                No Image
              </template> -->
              <template
                v-if="
                  header.toLowerCase().includes('imageurl') &&
                  row.imageUrl.length < 1
                "
              >
                No Image
              </template>
              <!-- if has image & have value -->
              <img
                class="rounded-md"
                width="60"
                height="60"
                v-else-if="header.toLowerCase().includes('imageurl')"
                :src="`${global.websiteLink}Resources/Images/${row.imageUrl}`"
                :alt="row.name"
                loading="lazy"
              />
              <template v-else-if="Array.isArray(row[header])">
                <div class="flex flex-wrap">
                  <span
                    v-for="tag of row[header]"
                    :key="tag"
                    class="bg-gray-300 text-black mr-4 mb-2 py-1 px-2 rounded-md"
                  >
                    {{ tag }}
                  </span>
                </div>
              </template>
              <template v-else>{{ row[header] }}</template>
            </td>
          </template>
          <td class="p-2" v-if="!actionHidden">
            <div class="flex items-center justify-between">
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
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <img
      src="@/assets/images/not-found.svg"
      alt="Not Found"
      class="w-3/4 p-8 m-auto"
      loading="lazy"
      v-else
    />
  </div>
</template>
