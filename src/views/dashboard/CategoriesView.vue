<script setup>
import { reactive, ref } from "vue";

import ModalComponent from "@/components/dashboard/ModalComponent.vue";
import TableComponent from "@/components/dashboard/TableComponent.vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import FileInputComponent from "@/components/dashboard/form/FileInputComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";

import { useGlobalStore } from "@/stores/global";

const global = useGlobalStore();

// Table Data Method
let headers = ref(["Name", "Image", "Sub Categories"]);
let categories = ref([]);

const form = ref({
  id: null,
  name: "",
  arName: "",
  imageUrlFile: null,
  companyId: 1,
});

const alertMessage = ref("");

async function getCategoryData() {
  const response = await global.apiCallMethod("Category/GetAll");
  if (response.status == 200) {
    categories.value = response.data;
    headers = Object.keys(response.data[0]);
  } else {
    (alertMessage.value = ""), (toggle.alert = true);
  }
}

getCategoryData();

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
  if (action == "edit") {
    toggle.isNew = false;
    form.value = {
      id: localData.id,
      name: localData.name,
      arName: localData.arName,
      imageUrlFile: null,
      companyId: 1,
    };
  } else {
    toggle.isNew = true;
    form.value = {
      id: null,
      name: "",
      arName: "",
      imageUrlFile: null,
      companyId: 1,
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
  formData.append("imageUrlFile", form.value.imageUrlFile);
  formData.append("companyId", form.value.companyId);
  if (toggle.isNew == true) {
    // Add Method
    const response = await global.apiCallMethod(
      `Category/AddCategory`,
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
        `Category/GetbyId?CategId=${response.data}`
      );
      categories.value.push(oneCategory.data);
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
      `Category/UpdateCategory?Id=${form.value.id}`,
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
        `Category/GetbyId?CategId=${form.value.id}`
      );
      categories.value = [
        ...categories.value.filter((item) => item.id != form.value.id),
      ];
      categories.value.push(oneCategory.data);
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
      `Category/DelCatXyz?id=${localData.id}`,
      "delete",
      {},
      {
        Accept: "application/json",
        Authorization: `Bearer ${$cookies.get("userToken")}`,
      }
    );
    if (response.status == 200) {
      categories.value = [
        ...categories.value.filter((item) => item.id != localData.id),
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
        content="Create New Category"
        :toggle="toggle.tableButton"
      />
    </button>

    <ModalComponent
      :isModalOpen="toggle.modal"
      @modalClose="toggleModal"
      class="transition-all"
    >
      <template #header>
        <h2>
          {{ toggle.isNew ? "Create New Category" : `Update ${form.name}` }}
        </h2>
      </template>
      <template #body>
        <form enctype="multipart/form-data" @submit.prevent="formSubmit">
          <TextInputComponent
            v-model:inputValue="form.name"
            inputName="Category Name"
            isRequired
          />
          <TextInputComponent
            v-model:inputValue="form.arName"
            inputName="Category Arabic Name"
          />
          <FileInputComponent
            v-model:inputValue="form.imageUrlFile"
            inputName="Category Image"
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
    :rows="categories"
    :headers="headers"
    @modelEditOpen="toggleModal"
    @deleteMethod="deleteMethod"
  />
</template>
