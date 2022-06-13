import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersNew from "../views/UsersNew.vue";
import UsersShow from "../views/UsersShow.vue";
import TrainingsIndex from "../views/TrainingsIndex.vue";
import TrainingsEdit from "../views/TrainingsEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/users/new",
    name: "UsersNew",
    component: UsersNew,
  },
  {
    path: "/users/:id",
    name: "UsersShow",
    component: UsersShow,
  },
  {
    path: "/trainings",
    name: "TrainingsIndex",
    component: TrainingsIndex,
  },
  {
    path: "/trainings/:id/edit",
    name: "TrainingsEdit",
    component: TrainingsEdit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
