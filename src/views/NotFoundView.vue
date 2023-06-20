<template>
  <div
    class="flex flex-col items-center min-h-screen justify-center text-center relative"
  >
    <svg
      class="absolute top-1/2 -translate-y-[110%] translate-x-1/2"
      xmlns="http://www.w3.org/2000/svg"
      width="74.426"
      height="155.696"
      viewBox="0 0 74.426 155.696"
    >
      <path
        id="Path_5"
        data-name="Path 5"
        d="M0,77.848H23.953L0,155.7,57.317,52.184H43.629L74.426,0,29.086,6.844Z"
        fill="#ffc400"
      />
    </svg>
    <p class="text-9xl text-primary-400">404</p>
    <p class="text-3xl">Looks like you are lost.</p>
    <p class="text-xs pt-4 text-gray-700">
      Oops! The page you are looking for does not exist. It might have been
      moved or deleted.
    </p>
    <RouterLink :to="{ name: 'home' }" class="pt-4 underline">
      Go Home
    </RouterLink>
  </div>
</template>
