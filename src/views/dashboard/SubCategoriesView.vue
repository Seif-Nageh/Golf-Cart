<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

import ModalComponent from "@/components/dashboard/ModalComponent.vue";
import TableComponent from "@/components/dashboard/TableComponent.vue";
import FormComponent from "@/components/dashboard/FormComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

// Table Data Method
let headers = ref(["name", "image", "Categories"]);
let subCategories = ref([]);
let categories = ref([]);

async function getData() {
  const res = await fetch(`${global.globalApi}SubCategory/GetAll`);
  const finalRes = await res.json();
  subCategories.value = finalRes.data;
  headers = Object.keys(finalRes.data[0]);
}

getData();

// Model Toggle Method
let toggle = reactive({
  modal: false,
  isNew: true,
});

// Inputs & category data fetch
const inputs = ref([]);
async function toggleModal(localData, action = "new") {
  if (action == "edit") {
    toggle.isNew = false;
    form.value = {
      id: localData.id,
      name: localData.name,
      categoryId: localData.categoryId,
    };
  }

  if (toggle.modal == false) {
    axios
      .get(`${global.globalApi}Category/GetAll`)
      .then((response) => {
        // Handle the response
        categories.value = response.data.data;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  } else {
    toggle.isNew = true;
    form.value = {
      id: null,
      name: "",
      categoryId: 0,
      imageFile: null,
    };
  }
  toggle.modal = !toggle.modal;

  // Form Inputs Method
  // inputs.value = [
  //   {
  //     modifer: "name",
  //     name: "SubCategory Name",
  //     type: "text",
  //     required: true,
  //   },
  //   {
  //     modifer: "imageFile",
  //     name: "SubCategory Image",
  //     type: "file",
  //     required: false,
  //   },
  //   {
  //     modifer: "categoryName",
  //     name: "Parent Category Name",
  //     type: "text",
  //     required: true,
  //     isSelect: true,
  //     selectDefault: "Choose a Category",
  //     categories,
  //   },
  // ];
}

const form = ref({
  id: null,
  name: "",
  categoryId: 0,
  imageFile: null,
});

const fileUpload = (e) => {
  form.value.imageFile = e.target.files[0];
};

async function deleteMethod(localData) {
  if (window.confirm(`You going to Delete ${localData.name}`)) {
    await axios
      .delete(`${global.globalApi}sub-category/DelSubCatXyz?${localData.id}`)
      .then((response) => {
        // Handle the response
        console.log(response);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}

async function formSubmit(e) {
  let formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("imageFile", form.value.imageFile);
  formData.append("categoryId", form.value.categoryId);

  console.log(form.value);
  if (toggle.isNew) {
    axios
      .post(`${global.globalApi}SubCategory/AddSubCategory`, formData)
      .then((response) => {
        // Handle the response
        console.log(response);
        toggle.modal = false;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }

  axios
    .put(
      `${global.globalApi}SubCategory/UpdateSubCategory?id=${form.value.id}`,
      formData
    )
    .then((response) => {
      // Handle the response
      console.log(response);
      toggle.modal = false;
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
}
</script>

<template>
  <div class="flex">
    <!--  modal -->
    <button class="btn-primary" @click="toggleModal">
      Create New subCategory
    </button>
    <ModalComponent :isModalOpen="toggle.modal" @modalClose="toggleModal">
      <template #header>
        <h2>
          {{ toggle.isNew ? "Create New SubCategory" : `Update ${form.name}` }}
        </h2>
      </template>
      <template #body>
        <!-- <FormComponent
          :inputs="inputs"
          v-model:name="form.name"
          v-model:category-name="form.categoryName"
          v-model:image-url="form.imageFile"
          @formSubmit="formSubmit()"
        ></FormComponent> -->
        <form enctype="multipart/form-data" @submit.prevent="formSubmit">
          <div class="mb-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="text"
              id="name"
              placeholder="SubCategory Name"
              required
              v-model="form.name"
            />
          </div>
          <div class="mb-6">
            <label
              for="file"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="file"
              id="file"
              placeholder="SubCategory Image"
              @change="fileUpload"
            />
          </div>
          <div class="mb-6">
            <label
              for="input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Parent Category
            </label>
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              v-model="form.categoryId"
            >
              <!-- :value="props[input.modifer]" -->
              <option value="0" disabled>Choose a Category</option>
              <option
                :value="category.id"
                v-for="category of categories"
                :key="category.name"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <button
            type="submit"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {{ toggle.isNew ? "Create" : "Edit" }}
          </button>
        </form>
      </template>
    </ModalComponent>
  </div>
  <!--  Table -->
  <TableComponent
    :rows="subCategories"
    :headers="headers"
    @modelEditOpen="toggleModal"
    @deleteMethod="deleteMethod"
  >
    <!-- <template #actions>
      <button
        id="categoryModalButton"
        type="button"
        @click="toggleModal"
        class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
      >
        Edit
      </button>
    </template> -->
  </TableComponent>
</template>
