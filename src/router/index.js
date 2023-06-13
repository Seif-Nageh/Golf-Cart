import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";

// function totop(to, from, next) {
//   window.scrollTo(0, 0);
//   next();
// }

function auth(to, from, next) {
  if (!localStorage.getItem("userToken") && !$cookies.get("userToken")) {
    return next({ name: "login" });
  }

  if (localStorage.getItem("userToken")) {
    $cookies.set("userToken", localStorage.getItem("userToken"));
  }

  const decoded = jwt_decode($cookies.get("userToken"));
  const expDate = decoded[`exp`] * 1000;
  const now = Date.now();

  if (expDate > now) {
    return next();
  } else {
    return next({ name: "login" });
  }
}

function unAuth(to, from, next) {
  if (!localStorage.getItem("userToken") && !$cookies.get("userToken")) {
    return next();
  } else {
    if (localStorage.getItem("userToken")) {
      $cookies.set("userToken", localStorage.getItem("userToken"));
    }
    const decoded = jwt_decode($cookies.get("user").token);
    const expDate = decoded[`exp`] * 1000;
    const now = Date.now();
    if (expDate < now) {
      localStorage.removeItem("user");
      $cookies.remove("user");
      return next();
    } else {
      return next({ name: "dashboard.home" });
    }
  }
}

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
          path: "products/:categoryId",
          name: "productsByCategory",
          component: () => import("../views/website/AllProductsView.vue"),
          props: true,
          async beforeRouteUpdate(to, from) {
            // react to route changes...
            this.categoryId = await fetchUser(to.params.categoryId);
          },
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
          // async beforeRouteUpdate(to, from) {
          //   // react to route changes...
          //   this.id = await fetchUser(to.params.id);
          // },
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/models/Auth/AuthMainView.vue"),
      beforeEnter: unAuth,
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/Auth/LoginView.vue"),
        },
        {
          path: "forget-password",
          component: () => import("@/models/Auth/ForgetPasswordMainView.vue"),
          children: [
            {
              path: "",
              name: "forgetPassword",
              component: () =>
                import("@/views/Auth/ForgetPassword/ForgetPasswordView.vue"),
            },
            {
              path: "verify",
              name: "verifyEmail",
              component: () =>
                import("@/views/Auth/ForgetPassword/VerifyEmailView.vue"),
            },
            {
              path: "reset-password",
              name: "resetPassword",
              component: () =>
                import("@/views/Auth/ForgetPassword/ResetPasswordView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/models/DashboardMainView.vue"),
      beforeEnter: auth,
      children: [
        {
          path: "",
          name: "dashboard.home",
          component: () => import("@/views/dashboard/HomeView.vue"),
          beforeEnter: (to, from, next) => {
            return next({ name: "dashboard.categories" });
          },
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
          path: "contact-us",
          name: "dashboard.contact",
          component: () => import("@/views/dashboard/ContactUsView.vue"),
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
      path: "/not-found",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      beforeEnter: (to, from, next) => {
        return next({ name: "notFound" });
      },
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});
export default router;
