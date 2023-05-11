import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/website/HomeView.vue";
import WebsiteMainView from "@/WebsiteMainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "website",
      component: WebsiteMainView,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
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
          component: () => import("../views/website/ProductView.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/DashboardMainView.vue"),
      children: [
        {
          path: "",
          name: "dashboard.home",
          component: () => import("../views/dashboard/HomeView.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: WebsiteMainView },
  ],
});

export default router;
