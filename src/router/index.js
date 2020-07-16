import Vue from "vue";
import VueRouter from "vue-router";

import Start from "../components/Start";
import Ahead from "../components/Ahead";
import Steps from "../components/Steps";
import Cards from "../components/Cards";
import Result from "../components/Result";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Start },
    { path: "/start", component: Start },
    { path: "/ahead", component: Ahead },
    { path: "/steps", component: Steps },
    { path: "/cards", component: Cards },
    { path: "/result", component: Result }
  ], scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

export default router;
