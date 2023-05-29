<script setup>
import { reactive, ref } from "vue";

import ModalComponent from "@/components/dashboard/ModalComponent.vue";
import TableComponent from "@/components/dashboard/TableComponent.vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import FileInputComponent from "@/components/dashboard/form/FileInputComponent.vue";
import SelectOptionsComponent from "@/components/dashboard/form/SelectOptionsComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

// Table Data Method
let headers = ref(["name", "image", "Categories"]);
let subCategories = ref([]);
let categories = ref([]);

const alertMessage = ref("");

async function getSubCategoryData() {
  const response = await global.apiCallMethod("SubCategory/GetAll");
  if (response.status == 200) {
    subCategories.value = response.data;
    headers = Object.keys(response.data[0]);
  } else {
    (alertMessage.value = ""), (toggle.alert = true);
  }
}

getSubCategoryData();

// Model Toggle Method
let toggle = reactive({
  modal: false,
  isNew: true,
  alert: false,
  tableButton: false,
  modalButton: false,
});

// category data fetch
async function toggleModal(localData, action = "new") {
  toggle.tableButton = true;
  toggle.modalButton = false;
  if (toggle.modal == false) {
    const response = await global.apiCallMethod("Category/GetAll");
    if (response.status == 200) {
      categories.value = response.data;
    } else {
      alertMessage.value = "";
      toggle.alert = true;
    }
  }
  toggle.tableButton = false;
  if (action == "edit") {
    console.log(localData);
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

  if (!toggle.alert) {
    toggle.modal = !toggle.modal;
  }
}

const form = ref({
  id: null,
  name: "",
  categoryId: 0,
  categoryName: "",
  imageFile: null,
  imageUrl: null,
});

async function formSubmit(e) {
  toggle.modalButton = true;
  let formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("imageFile", form.value.imageFile);
  formData.append("categoryId", form.value.categoryId);
  if (toggle.isNew == true) {
    // Add Method
    const response = await global.apiCallMethod(
      `SubCategory/AddSubCategory`,
      "post",
      formData,
      {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("user").token}`,
      }
    );
    if (response.status == 200) {
      const oneCategory = await global.apiCallMethod(
        `SubCategory/GetbyId?SubCategId=${response.data}`
      );
      subCategories.value.push(oneCategory.data);
      toggle.modalButton = false;
      toggle.modal = false;
    } else {
      toggle.modalButton = false;
      alertMessage.value = "";
      toggle.alert = true;
    }
  } else {
    // Update Method
    const response = await global.apiCallMethod(
      `SubCategory/UpdateSubCategory?id=${form.value.id}`,
      "put",
      formData,
      {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("user").token}`,
      }
    );
    if (response.status == 200) {
      const oneCategory = await global.apiCallMethod(
        `SubCategory/GetbyId?SubCategId=${form.value.id}`
      );
      subCategories.value = [
        ...subCategories.value.filter((item) => item.id != form.value.id),
      ];
      subCategories.value.push(oneCategory.data);
      toggle.modalButton = false;
      toggle.modal = false;
    } else {
      toggle.modalButton = false;
      alertMessage.value = "";
      toggle.alert = true;
    }
  }
}

async function deleteMethod(localData) {
  if (window.confirm(`You going to Delete ${localData.name}`)) {
    const response = await global.apiCallMethod(
      `SubCategory/DelSubCatXyz?id=${localData.id}`,
      "delete",
      {},
      {
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("user").token}`,
      }
    );
    if (response.status == 200) {
      subCategories.value = [
        ...subCategories.value.filter((item) => item.id != localData.id),
      ];
      alertMessage.value = `${localData.name} Has Been Deleted`;
      toggle.alert = true;
    } else {
      alertMessage.value = "";
      toggle.alert = true;
    }
  }
}

function alertClose() {
  toggle.alert = false;
}
</script>

<template>
  <div class="flex">
    <!-- Error Alert -->
    <ErrorAlertComponent
      @alertClose="alertClose"
      v-if="toggle.alert"
      class="fixed bottom-0 z-40 right-5"
    >
      <template #body>
        <span v-if="alertMessage.length > 0">{{ alertMessage }}</span>
        <span v-else>
          Sorry Somthing Went Wrong !!<br />Please try again later
        </span>
      </template>
    </ErrorAlertComponent>
    <!--  modal -->
    <button
      type="submit"
      class="btn-primary"
      @click="toggleModal"
      :disabled="toggle.tableButton"
    >
      <LoadingTextComponent
        content="Create New subCategory"
        :toggle="toggle.tableButton"
      />
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
          <button
            type="submit"
            class="btn-primary"
            :disabled="toggle.modalButton"
          >
            <LoadingTextComponent
              :content="toggle.isNew ? 'Create' : 'Edit'"
              :toggle="toggle.modalButton"
            />
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
