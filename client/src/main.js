import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootswatch/dist/cosmo/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";
import _ from "lodash";
import VueMoment from "vue-moment";

import VCalendar from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";

import PortalVue from "portal-vue";
Vue.use(PortalVue);

//Axios import
window.axios = require("axios");
//window.axios.defaults.headers.common['Authorization'] = 'application/x-www-form-urlencoded';
window.axiMara = axios.create({
  baseURL: "/api",
});

axiMara.defaults.headers.common["Authorization"] = localStorage.getItem(
  "id_token"
);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  firstDayOfWeek: 2,
});
Vue.use(Toasted, {
  position: "bottom-center",
  duration: 2000,
  fullWidth: true,
});

Vue.use(VueMoment);

Vue.toasted.register(
  "sos",
  (payload) => {
    if (!payload.message) {
      return "SOS active";
    }
    return "SOS active in room: " + payload.message;
  },
  {
    type: "error",
    duration: null,
    className: ["sos-toast"],
  }
);

Vue.toasted.register(
  "err",
  (payload) => {
    if (!payload.message) {
      return "Error";
    }
    return "Error: " + payload.message;
  },
  {
    type: "error",
    duration: 2000,
    className: ["err-toast"],
  }
);

//Import components

import AppNav from "@/components/AppNav";
import EventsLog from "@/components/EventsLog";
Vue.component("app-nav", AppNav);
Vue.component("events-log", EventsLog);

axiMara.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    console.log(error, 'err')
    if (error.response.status === 401 || error.response.status === 403) {
      Vm.$store.dispatch("logout");
      Vm.$router.push("/auth/login");
      localStorage.clear();
    }
    return Promise.reject(error.response);
  }
);

var Vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
