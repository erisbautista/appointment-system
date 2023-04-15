import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import App from "./App.vue";
//Datatable
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
//Full calendar
import FullCalendar from "@fullcalendar/vue3";
//Datepicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.config.globalProperties.$dayjs = dayjs;
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("FullCalendar", FullCalendar);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
