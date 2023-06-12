<script setup>
import { ref, reactive, onUpdated } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import router from "../../router";
const global = useGlobalStore();

const route = useRoute();
let id = route.params.categoryId;

const products = ref([]);
const pageNumber = ref(0);
const pageSize = ref(10);
const alertMessage = ref("");
const categoryId = ref(0);

let toggle = reactive({
  alert: false,
  button: false,
  loadingButton: false,
});

async function getData() {
  toggle.loadingButton = true;
  toggle.button = true;
  pageNumber.value++;

  let endPointUrl = "";

  if (id != undefined) {
    endPointUrl = `Product/GetProductsbyCategory?CategoryId=${id}`;
  } else {
    endPointUrl = `Product/GetAllProducts?companyId=1&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`;
  }

  const response = await global.apiCallMethod(endPointUrl);

  if (response.status == 200) {
    if (response.data.length < 1) {
      toggle.alert = true;
      toggle.loadingButton = false;
      toggle.button = true;
      alertMessage.value = "Sorry No More Data !!!!";
    } else if (response.data.length >= pageSize.value) {
      toggle.button = false;
    }
    toggle.loadingButton = false;
    products.value.push(...response.data);
    if (products.value.length < 1) {
      router.replace({ name: "notFound" });
    }
  } else {
    toggle.alert = true;
  }
}

getData();

onUpdated(() => {
  if (id != categoryId && categoryId != 0 && id != undefined) {
    id = route.params.categoryId;
    getData();
  }
});

// onUpdated(() => {
//   if (props.prodId != productId.value) {
//     getData();
//     console.log(props.prodId);
//   }
// });

function alertClose() {
  toggle.alert = false;
}
</script>

<template>
  <!-- Error Alert -->
  <ErrorAlertComponent
    @alertClose="alertClose"
    v-if="toggle.alert"
    class="fixed bottom-0 z-[100] right-5"
  >
    <template #body>
      <span v-if="alertMessage.length > 0">{{ alertMessage }}</span>
      <span v-else>
        Sorry Somthing Went Wrong !!<br />Please try again later
      </span>
    </template>
  </ErrorAlertComponent>
  <ProductsSection
    title="All Products"
    :products="products"
    class="pt-6"
  ></ProductsSection>
  <div class="flex items-center py-10">
    <button
      class="btn-primary m-auto px-10 bg-primary-400 disabled:bg-gray-500"
      :disabled="toggle.button"
      @click="getData"
    >
      <LoadingTextComponent
        content="Load More"
        :toggle="toggle.loadingButton"
      />
    </button>
  </div>
</template>
