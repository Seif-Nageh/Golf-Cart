import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "flowbite";
import "./assets/main.css";
library.add(
  faMagnifyingGlass,
  faBars,
  faUser,
  faLocationDot,
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faWhatsapp
);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(VueCookies, { expires: "1m" });

app.mount("#app");
