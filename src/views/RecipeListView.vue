<template>
  <div id="rl-main">
    <div class="text-center">
      <span class="c-btn" @click="toggleShowCategories">Categories</span>
      <div v-if="showCategories">
        <!-- {{ selectedCategories }} -->
        <span v-for="(category, index) in categories" :key="index">
          <v-chip
            class="ma-3"
            :dark="selectedCategories.includes(category.id)"
            :color="
              selectedCategories.includes(category.id) ? 'black' : 'white'
            "
            @click="updateSelectedCategories(category)"
            >{{ category.name }}
          </v-chip>
        </span>
      </div>
    </div>
    <h1 class="text-center abril">recipe list</h1>
    <div v-if="recipes.length === 0">
      <div class="text-center">
        <span>There are no recipes with this category..</span>
      </div>
    </div>
    <div id="r-wrapper" class="ma-3">
      <div
        @click="recipeDetails(item)"
        v-for="(item, index) in recipes"
        :key="index"
        class="elevation-3 recipe"
      >
        <img
          v-if="item.pic"
          :src="`https://59esd0ee.directus.app/assets/${item.pic}`"
          alt="featured image"
        />
        <img
          v-else
          src="https://www.thetipsymacaron.com/wp-content/uploads/cotton-candy-macarons.jpg
            "
          alt="featured image"
        />
        <span class="text-center recipe-title">
          <strong>{{ item.name }}</strong
          ><br />
          <i v-for="(cat, i) in item.categories" :key="i"
            >{{ cat.categories_id.name }}

            {{ i + 1 === item.categories.length ? "" : " | " }}
          </i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "HI",
      recipes: [],
      selectedCategories: [],
      categories: [],
      showCategories: false,
    };
  },
  mounted() {
    this.getRecipes();
    this.getCategories();
  },
  watch: {
    selectedCategories() {
      if (this.selectedCategories.length > 0) {
        this.getFilteredRecipes();
      } else {
        this.getRecipes();
      }
    },
  },
  methods: {
    toggleShowCategories() {
      this.showCategories = !this.showCategories;
    },
    updateSelectedCategories(item) {
      if (!this.selectedCategories.includes(item.id)) {
        this.selectedCategories = [];
        this.selectedCategories.push(item.id);
      } else {
        let x = this.selectedCategories.indexOf(item.id);
        this.selectedCategories.splice(x, 1);
      }
    },
    getCategories() {
      axios
        .get("https://59esd0ee.directus.app/items/categories?fields=*.*.*")
        .then((response) => {
          console.log("success", response.data.data);
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    getFilteredRecipes() {
      console.log("getting filtered");
      var filter_string = "";
      for (let i = 0; i < this.selectedCategories.length; i++) {
        filter_string += `&filter[categories_id][_in]=${this.selectedCategories[i]}`;
      }
      console.log(filter_string);
      axios
        .get(
          `https://59esd0ee.directus.app/items/categories_recipes?fields=*.*.*.*${filter_string}`
        )
        .then((response) => {
          console.log(response.data.data, "response");
          this.recipes = [];
          for (let i = 0; i < response.data.data.length; i++) {
            // console.log(response.data.data[i]);
            if (response.data.data[i].recipes_id !== null) {
              console.log(response.data.data[i].posts_id, "post");
              this.recipes.push({
                ...response.data.data[i].recipes_id,
                pic: response.data.data[i].recipes_id.pic?.id
                  ? response.data.data[i].recipes_id.pic?.id
                  : "",
              });
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    recipeDetails(item) {
      this.$router.push(`recipe/${item.id}`);
    },
    getRecipes() {
      axios
        .get("https://59esd0ee.directus.app/items/recipes?fields=*.*.*")
        .then((response) => {
          console.log("success", response.data.data);
          this.recipes = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
.recipe {
  background-color: white;
  border-radius: 10px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px 10px;
  max-width: 70vw;
}
#r-wrapper {
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.recipe img {
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  max-width: 100%;
}

.recipe:hover {
  cursor: pointer;
  transition: 0.3s;
}
.recipe-title {
  padding: 10px;
}

#rl-main {
  background-color: #f6e4d1;
  min-height: calc(100vh - 56px);
  padding: 20px 0;
}

@media (min-width: 795px) {
  .recipe {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    position: relative;
    bottom: 0;
  }
  .recipe:hover {
    bottom: 20px;
    transition: 0.3s;
  }
  .recipe img {
    max-height: 400px;
  }

  #r-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>
