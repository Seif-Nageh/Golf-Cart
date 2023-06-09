import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import VueSocialChat from "vue-social-chat";
import "vue-social-chat/dist/style.css";
import "clickout-event";
import { library } from "@fortawesome/fontawesome-svg-core";
import { initFlowbite } from "flowbite";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faLocationDot,
  faPhone,
  faArrowRightLong,
  faClock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "flowbite";
import "./assets/main.css";
library.add(
  faMagnifyingGlass,
  faBars,
  faUser,
  faClock,
  faPhone,
  faLocationDot,
  faArrowRightLong,
  faFacebook,
  faEnvelope,
  faInstagram,
  faTwitter,
  faWhatsapp
);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(VueCookies);
app.use(VueSocialChat);
app.mount("#app");
