import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import RecipeListlView from "../views/RecipeListView.vue";
import ArticleListView from "../views/ArticleListView.vue";
import RecipeDetail from "../views/RecipeDetail.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/details/:id",
    name: "details",
    component: DetailView,
  },
  {
    path: "/recipes",
    name: "recipes",
    component: RecipeListlView,
  },
  {
    path: "/recipe/:id",
    name: "recipe-details",
    component: RecipeDetail,
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticleListView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
