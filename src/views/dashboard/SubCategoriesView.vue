<script setup>
import ModalComponent from "@/components/dashboard/ModalComponent.vue";
import { reactive, ref } from "vue";
import TableComponent from "../../components/dashboard/TableComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

let toggle = reactive({
  modal: false,
});

let subCategories = ref([]);
let headers = ref(["name", "image", "Categories"]);

const toggleModal = () => {
  toggle.modal = !toggle.modal;
};

async function getData() {
  const res = await fetch(`${global.globalApi}SubCategory/GetAll`);
  const finalRes = await res.json();
  subCategories.value = finalRes.data;
  headers = Object.keys(finalRes.data[0]);
}

getData();

// subCategories = global.getData();
</script>

<template>
  <div class="flex">
    <!--  modal -->
    <button class="btn-primary" @click="toggleModal">
      Create New subCategory
    </button>
    <ModalComponent :isModalOpen="toggle.modal" @modalClose="toggleModal">
      <template #body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa sequi laudantium ea debitis, illum
          natus repudiandae ratione laboriosam nobis? At molestiae veritatis
          repudiandae animi cumque perferendis vitae voluptatibus harum eveniet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa sequi laudantium ea debitis, illum
          natus repudiandae ratione laboriosam nobis? At molestiae veritatis
          repudiandae animi cumque perferendis vitae voluptatibus harum eveniet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa sequi laudantium ea debitis, illum
          natus repudiandae ratione laboriosam nobis? At molestiae veritatis
          repudiandae animi cumque perferendis vitae voluptatibus harum eveniet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa sequi laudantium ea debitis, illum
          natus repudiandae ratione laboriosam nobis? At molestiae veritatis
          repudiandae animi cumque perferendis vitae voluptatibus harum eveniet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Culpa sequi laudantium ea debitis, illum
          natus repudiandae ratione laboriosam nobis? At molestiae veritatis
          repudiandae animi cumque perferendis vitae voluptatibus harum eveniet.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi
          laudantium ea debitis, illum natus repudiandae ratione laboriosam
          nobis? At molestiae veritatis repudiandae animi cumque perferendis
          vitae voluptatibus harum eveniet.
        </p>
      </template>
    </ModalComponent>
  </div>
  <!--  Table -->
  <TableComponent :rows="subCategories" :headers="headers">
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
