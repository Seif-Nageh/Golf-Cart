import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "website",
      component: () => import("@/models/WebsiteMainView.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/website/HomeView.vue"),
        },
        {
          path: "about-us",
          name: "about",
          component: () => import("../views/website/AboutView.vue"),
        },
        {
          path: "products",
          name: "products",
          component: () => import("../views/website/AllProductsView.vue"),
        },
        {
          path: "contact-us",
          name: "contact",
          component: () => import("../views/website/ContactUsView.vue"),
        },
        {
          path: "product/:id",
          name: "product",
          component: () => import("../views/website/ProductView.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/models/DashboardMainView.vue"),
      children: [
        {
          path: "",
          name: "dashboard.home",
          component: () => import("@/views/dashboard/HomeView.vue"),
        },
        {
          path: "products",
          name: "dashboard.products",
          component: () => import("@/views/dashboard/ProductsView.vue"),
        },
        {
          path: "categories",
          name: "dashboard.categories",
          component: () => import("@/views/dashboard/CategoriesView.vue"),
        },
        {
          path: "subCategories",
          name: "dashboard.subCategories",
          component: () => import("@/views/dashboard/SubCategoriesView.vue"),
        },
        {
          path: "settings",
          name: "dashboard.settings",
          component: () => import("@/views/dashboard/HomeView.vue"),
        },
        {
          path: "users",
          name: "dashboard.users",
          component: () => import("@/views/dashboard/HomeView.vue"),
        },
        {
          path: "user-profile",
          name: "dashboard.userProfile",
          component: () => import("@/views/dashboard/HomeView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
