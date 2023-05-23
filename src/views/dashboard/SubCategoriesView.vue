<script setup>
  import { reactive, ref } from "vue";
  import axios from "axios";

  import ModalComponent from "@/components/dashboard/ModalComponent.vue";
  import TableComponent from "@/components/dashboard/TableComponent.vue";
  import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
  import FileInputComponent from "@/components/dashboard/form/FileInputComponent.vue";
  import SelectOptionsComponent from "@/components/dashboard/form/SelectOptionsComponent.vue";

  import { useGlobalStore } from "@/stores/global";

  const global = useGlobalStore();

  // Table Data Method
  let headers = ref(["name", "image", "Categories"]);
  let subCategories = ref([]);
  let categories = ref([]);

  async function getSubCategoryData() {
    const response = await global.apiCallMethod("SubCategory/GetAll");
    if (response.status == 200) {
      subCategories.value = response.data;
      headers = Object.keys(response.data[0]);
    } else {
      console.log(response);
    }
  }

  getSubCategoryData();

  // Model Toggle Method
  let toggle = reactive({
    modal: false,
    isNew: true,
  });

  // category data fetch
  const inputs = ref([]);
  async function toggleModal(localData, action = "new") {
    if (toggle.modal == false) {
      const response = await global.apiCallMethod("Category/GetAll");
      if (response.status == 200) {
        categories.value = response.data;
      } else {
        console.log(response);
      }
    }

    if (action == "edit") {
      toggle.isNew = false;
      form.value = {
        id: localData.id,
        name: localData.name,
        categoryId: localData.categoryId,
      };
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
  }

  const form = ref({
    id: null,
    name: "",
    categoryId: 0,
    imageFile: null,
  });

  async function formSubmit(e) {
    let formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("imageFile", form.value.imageFile);
    formData.append("categoryId", form.value.categoryId);
    console.log(form.value);

    if (toggle.isNew) {
      // Add Method
      const response = await global.apiCallMethod(
        `SubCategory/AddSubCategory`,
        "post",
        formData,
        {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
        }
      );
      if (response.status == 200) {
        toggle.modal = false;
      } else {
        console.log(response);
      }
    } else {
      // Update Method
      const response = await global.apiCallMethod(
        `${global.globalApi}SubCategory/UpdateSubCategory?id=${form.value.id}`,
        "put",
        formData
      );
      if (response.status == 200) {
        toggle.modal = false;
      } else {
        console.log(response);
      }
    }
  }

  async function deleteMethod(localData) {
    if (window.confirm(`You going to Delete ${localData.name}`)) {
      const response = await global.apiCallMethod(
        `SubCategory/DelSubCatXyz?id=${localData.id}`,
        "delete"
      );
    }
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
        <form enctype="multipart/form-data" @submit.prevent="formSubmit">
          <div class="mb-6">
            <TextInputComponent
              v-model:inputValue="form.name"
              inputName="SubCategory Name"
              isRequired
            />
          </div>
          <div class="mb-6">
            <FileInputComponent
              v-model:inputValue="form.imageFile"
              inputName="SubCategory Image"
            />
          </div>
          <div class="mb-6">
            <SelectOptionsComponent
              v-model:inputValue="form.categoryId"
              inputName="Parent Category"
              :inputOptions="categories"
            />
          </div>
          <button type="submit" class="btn-primary">
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
  />
</template>
