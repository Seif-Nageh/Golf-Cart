<script setup>
import { ref, reactive, watch } from "vue";
import ProductsSection from "@/components/website/ProductsSection.vue";
import ErrorAlertComponent from "@/components/ErrorAlertComponent.vue";
import LoadingTextComponent from "@/components/LoadingTextComponent.vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import router from "../../router";
const global = useGlobalStore();

const route = useRoute();

const products = ref([]);
const pageNumber = ref(0);
const pageSize = ref(10);
const alertMessage = ref("");

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

  if (route.params.categoryId != undefined) {
    endPointUrl = `Product/GetProductsbyCategory?CategoryId=${route.params.categoryId}`;
  } else {
    endPointUrl = `Product/GetAllProducts?companyId=1&pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`;
  }

  const response = await global.apiCallMethod(endPointUrl);

  if (response.status == 200) {
    if (response.data.length < 1) {
      toggle.alert = true;
      toggle.loadingButton = false;
      toggle.button = true;
      alertMessage.value = "Sorry No Data Found !!!!";
    } else if (response.data.length >= pageSize.value) {
      toggle.button = false;
    }
    toggle.loadingButton = false;
    if (route.params.categoryId) {
      products.value = response.data;
    } else {
      products.value.push(...response.data);
    }
    // if (products.value.length < 1) {
    //   // router.replace({ name: "notFound" });
    // }
  } else {
    toggle.alert = true;
  }
}

getData();

watch(
  () => route.params.categoryId,
  () => {
    getData();
  }
);

function alertClose() {
  toggle.alert = false;
}
</script>

<template>
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
  <div class="relative">
    <img
      src="@/assets/images/products-Hero.png"
      alt="products Hero"
      class="w-full min-h-[10rem]"
    />
    <p
      class="absolute top-1/2 -translate-y-1/2 translate-x-1/2 text-3xl md:text-4xl lg:text-6xl text-white font-semibold"
    >
      Products
    </p>
  </div>
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
