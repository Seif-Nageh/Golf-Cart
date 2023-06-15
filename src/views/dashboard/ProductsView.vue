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
let products = ref([]);
let categories = ref([]);
const pageNumber = ref(0);
const pageSize = ref(10);

// Model Toggle Method
let toggle = reactive({
  modal: false,
  isNew: true,
  alert: false,
  tableButton: false,
  modalButton: false,
  loadingButton: false,
  button: false,
});

const alertMessage = ref("");

const form = ref({
  id: null,
  name: "",
  arName: "",
  productDesc: "",
  arProductDesc: "",
  imageUrl: null,
  price: 0,
  color: 4,
  categoryId: 0,
});

async function getProductData() {
  // toggle.loadingButton = true;
  pageNumber.value++;
  const response = await global.apiCallMethod(
    `Product/GetAllProducts?companyId=1&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`
  );

  if (response.status == 200) {
    headers.value = Object.keys(response.data[0]);
    if (response.data.length < 1) {
      toggle.alert = true;
      toggle.loadingButton = false;
      toggle.button = true;
      alertMessage.value = "Sorry No More Data !!!!";
    }
    products.value.push(...response.data);
  }
}

getProductData();

// category data fetch
async function toggleModal(localData, action = "new") {
  toggle.alert = false;
  toggle.tableButton = true;
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
    toggle.isNew = false;
    form.value = {
      id: localData.id,
      name: localData.name,
      categoryId: localData.categoryId,
      price: localData.price,
    };
  } else {
    toggle.isNew = true;
    form.value = {
      id: null,
      name: "",
      categoryId: 0,
      price: 0,
      imageFile: null,
    };
  }

  if (!toggle.alert) {
    toggle.modal = !toggle.modal;
  }
}

async function formSubmit(e) {
  toggle.modalButton = true;
  let formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("arName", form.value.arName);
  formData.append("productDesc", form.value.productDesc);
  formData.append("arProductDesc", form.value.arProductDesc);
  formData.append("price", form.value.price);
  formData.append("imageUrl", form.value.imageFile);
  formData.append("categoryId", form.value.categoryId);
  formData.append("color", 4);
  if (toggle.isNew == true) {
    // Add Method
    const response = await global.apiCallMethod(
      `Product/AddProduct`,
      "post",
      formData,
      {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("userToken")}`,
      }
    );
    if (response.status == 200) {
      const oneCategory = await global.apiCallMethod(
        `Product/${response.data}`
      );
      products.value.push(oneCategory.data);
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
      `Product/UpdateProduct/${form.value.id}`,
      "put",
      formData,
      {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("userToken")}`,
      }
    );

    if (response.status == 200) {
      const oneCategory = await global.apiCallMethod(
        `Product/${response.data}`
      );
      products.value = [
        ...products.value.filter((item) => item.id != form.value.id),
      ];
      products.value.push(oneCategory.data);
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
      `Product/DelProductXyz?id=${localData.id}`,
      "delete",
      {},
      {
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("userToken")}`,
      }
    );
    if (response.status == 200) {
      products.value = [
        ...products.value.filter((item) => item.id != localData.id),
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

function closeModel() {
  toggle.modal = false;
}
</script>

<template>
  <div class="flex">
    <!-- Error Alert -->
    <ErrorAlertComponent
      @alertClose="alertClose"
      v-if="toggle.alert"
      class="fixed bottom-0 z-[100] left-5"
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
        content="Create New Product"
        :toggle="toggle.tableButton"
      />
    </button>

    <ModalComponent :isModalOpen="toggle.modal" @modalClose="closeModel">
      <template #header>
        <h2>
          {{ toggle.isNew ? "Create New Product" : `Update ${form.name}` }}
        </h2>
      </template>
      <template #body>
        <form enctype="multipart/form-data" @submit.prevent="formSubmit">
          <TextInputComponent
            v-model:inputValue="form.name"
            inputName="Product Name"
            isRequired
          />
          <TextInputComponent
            v-model:inputValue="form.arName"
            inputName="Product Arabic Name"
          />
          <TextInputComponent
            v-model:inputValue="form.productDesc"
            inputName="Product Description"
            isRequired
          />
          <TextInputComponent
            v-model:inputValue="form.arProductDesc"
            inputName="Product Arabic Description"
          />
          <TextInputComponent
            v-model:inputValue="form.price"
            inputName="Product price"
            inputType="number"
          />
          <FileInputComponent
            v-model:inputValue="form.imageFile"
            inputName="Product Image"
          />
          <SelectOptionsComponent
            v-model:inputValue="form.categoryId"
            inputName="Parent Category"
            :inputOptions="categories"
            isRequired
          />
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
    :rows="products"
    :headers="headers"
    @modelEditOpen="toggleModal"
    @deleteMethod="deleteMethod"
  />
  <div class="flex items-center py-10">
    <button
      class="btn-primary m-auto px-10 bg-primary-400 disabled:bg-gray-500"
      :disabled="toggle.button"
      @click="getProductData"
    >
      <LoadingTextComponent
        content="Load More"
        :toggle="toggle.loadingButton"
      />
    </button>
  </div>
</template>
