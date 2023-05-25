<script setup>
import { reactive, ref } from "vue";

import ModalComponent from "@/components/dashboard/ModalComponent.vue";
import TableComponent from "@/components/dashboard/TableComponent.vue";
import TextInputComponent from "@/components/dashboard/form/TextInputComponent.vue";
import FileInputComponent from "@/components/dashboard/form/FileInputComponent.vue";
import SelectOptionsComponent from "@/components/dashboard/form/SelectOptionsComponent.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
// import LoadingButtonComponent from "@/components/LoadingButtonComponent.vue";

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
        Authorization: `Bearer ${$cookies.get("user").token}`,
      }
    );
    console.log(response);
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
        Authorization: `Bearer ${$cookies.get("user").token}`,
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
        Authorization: `Bearer ${$cookies.get("user").token}`,
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
      class="fixed bottom-0 z-[100] right-5 transition-all"
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
      <span v-if="!toggle.tableButton">Create New Category</span>
      <span v-else>
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 mr-3 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Loading...
      </span>
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
          <div class="mb-6">
            <TextInputComponent
              v-model:inputValue="form.name"
              inputName="Category Name"
              isRequired
            />
            <TextInputComponent
              v-model:inputValue="form.arName"
              inputName="Category Arabic Name"
              isRequired
            />
          </div>
          <div class="mb-6">
            <FileInputComponent
              v-model:inputValue="form.imageUrlFile"
              inputName="Category Image"
            />
          </div>
          <button
            type="submit"
            class="btn-primary"
            :disabled="toggle.modalButton"
          >
            <span v-if="!toggle.modalButton">
              {{ toggle.isNew ? "Create" : "Edit" }}
            </span>
            <span v-else>
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </span>
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
