<script setup>
const routers = [
  // {
  //   to: "", // router view name
  //   name: "", // showen name
  // },
  {
    to: "dashboard.home",
    name: "Dashboard",
  },
  {
    to: "dashboard.categories",
    name: "Categories",
  },
  {
    to: "dashboard.subCategories",
    name: "Sub Categories",
  },
  {
    to: "dashboard.products",
    name: "Product",
  },
  {
    to: "dashboard.settings",
    name: "Settings",
  },
  {
    to: "dashboard.users",
    name: "Users",
  },
];
</script>

<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-10 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="router of routers" :key="router.name">
          <RouterLink
            :to="{ name: router.to }"
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
            exact-active-class="bg-primary-200"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white fill-primary-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">{{ router.name }}</span>
          </RouterLink>
        </li>
        <!-- <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
          </a>
        </li> -->
      </ul>
    </div>
  </aside>
</template>
