<template>
  <div id="d-main" class="pa-3">
    <div class="b-btn">
      <v-btn dark small @click="back()">
        <font-awesome-icon
          class="mr-2"
          icon="fa-solid fa-arrow-left-long"
        />articles</v-btn
      >
    </div>
    <!-- <h1 class="text-center ma-5 abril">{{ post.title }}</h1> -->
    <!-- 
    <div class="text-center" v-if="post.categories">
      <span v-for="(item, index) in post.categories" :key="index">
        <strong
          >{{ item.categories_id.name }}

          {{ index === post.categories.length - 1 ? " " : "|" }}
        </strong>
      </span>
    </div> -->
    <div class="wrapper">
      <div class="post-img" style="display: flex; justify-content: center">
        <img
          v-if="post.pic"
          :src="`https://59esd0ee.directus.app/assets/${post.pic.id}`"
          alt="post image"
          style="max-width: 100%"
        />
        <img
          v-else
          src="https://www.thetipsymacaron.com/wp-content/uploads/cotton-candy-macarons.jpg
            "
          alt="featured image"
          class="elevation-3"
          style="max-width: 100%"
        />
      </div>

      <div class="content-wrapper">
        <div class="pa-3 elevation-3 content">
          <h1 class="text-center ma-5 abril">
            {{ post.title }}
          </h1>
          <div class="text-center ma-3" v-if="post.categories">
            <span v-for="(item, index) in post.categories" :key="index">
              <strong
                >{{ item.categories_id.name }}

                {{ index === post.categories.length - 1 ? " " : "|" }}
              </strong>
            </span>
          </div>
          <div class="text-center">
            <p>
              {{ post.body }}
            </p>
            <v-btn
              v-if="recipes.length > 0"
              class="ma-3 mb-5"
              href="#recipe"
              dark
              >Recipe</v-btn
            >
          </div>
          <span
            style="display: flex; justify-content: center; align-items: center"
          >
            <i>{{ post.date_created | dateFilter() }}</i>
            <font-awesome-icon class="ml-5" icon="fa-solid fa-utensils" />
            <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
          </span>
        </div>
      </div>
    </div>
    <div id="recipe" class="recipe-card" v-if="recipes.length > 0">
      <!-- {{ recipes[0].recipes_id }} -->
      <h3 class="pa-3">{{ recipes[0].recipes_id.name }}</h3>
      <v-data-table
        class="pa-3"
        dense
        style="border-radius: 0 0 10px 10px"
        :items="recipes[0].recipes_id.ingredients"
        :headers="headers"
      >
        <template v-slot:item.quantity="{ item }">
          <div>{{ item.quantity }} {{ item.unit }}</div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      post: "hi",
      categories: [],
      recipes: [],
      headers: [
        { text: "Ingredient", value: "name", align: "center" },
        { text: "Quantity", value: "quantity", align: "center" },
      ],
    };
  },
  filters: {
    dateFilter(value) {
      return moment(value).format("ll");
    },
  },
  methods: {
    getPost() {
      axios
        .get(
          `https://59esd0ee.directus.app/items/posts/${this.$route.params.id}?fields=*.*.*.*`
        )
        .then((response) => {
          console.log("success", response.data);
          this.post = response.data.data;
          this.categories = response.data.data.categories;
          if (this.post.recipes) {
            this.recipes = response.data.data.recipes;
            // this.ingredients = this.recipes[0];
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    back() {
      this.$router.push({ name: "articles" });
    },
  },
  mounted() {
    this.getPost();
  },
};
</script>

<style scoped>
.content {
  margin-top: 30px;
  background-color: white;
  /* border: 2px solid orange; */
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  border-radius: 10px;
}
.b-btn {
  margin-bottom: 20px;
}
.recipe-card {
  background-color: white;
  border-radius: 10px;
  text-align: center;
  margin: 30px 0;
}
#d-main {
  background-color: #f6e4d1;
  min-height: calc(100vh - 56px);
}
img {
  border-radius: 10px;
}

@media (min-width: 795px) {
  .b-btn {
    margin-bottom: 0;
    margin-top: 30px;
    margin-left: 50px;
  }
  .recipe-card {
    margin: 30px;
  }

  .post-img {
    /* border: 2px solid purple; */
    width: 50%;
    padding: 50px;
  }
  .wrapper {
    /* border: 2px solid red; */
    display: flex;
  }
  .content-wrapper {
    /* border: 2px solid orange; */
    flex-grow: 1;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    /* border: 2px solid palevioletred; */
    justify-content: center;
    margin-top: 0;
    width: 90%;
    height: 90%;
  }
}
</style>
