import { createRouter, createWebHistory } from "vue-router"
import ShowData from "@/views/ShowData.vue";  
import ShowDataV2 from "@/views/ShowDataV2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name:"练度观察", path: "/",component:ShowData}
  ],
});

export default router;
