<template>
  <div id="r-main" class="pa-3">
    <div>
      <v-btn dark small @click="back()">
        <font-awesome-icon
          class="mr-2"
          icon="fa-solid fa-arrow-left-long"
        />recipes</v-btn
      >
    </div>
    <h1 class="text-center ma-5 abril">{{ recipe.name }}</h1>
    <div class="text-center">
      <span v-for="(category, index) in this.recipe.categories" :key="index">{{
        category.categories_id.name
      }}</span>
    </div>
    <div class="combo-wrapper">
      <div class="r-img">
        <img
          v-if="recipe.pic"
          :src="`https://59esd0ee.directus.app/assets/${recipe.pic}`"
          alt="featured image"
          class="elevation-3"
        />
        <img
          v-else
          src="https://www.thetipsymacaron.com/wp-content/uploads/cotton-candy-macarons.jpg
            "
          alt="featured image"
          class="elevation-3"
        />
      </div>
      <div id="combo">
        <div class="pa-3 elevation-3 content" style="border: 1px solid gray">
          <p>
            {{ recipe.description }}
          </p>
          <span
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <i>{{ recipe.date_created | dateFilter() }}</i>
            <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
            <font-awesome-icon icon="fa-solid fa-utensils" />
          </span>
        </div>
        <div class="elevation-3" id="r-table">
          <h3 class="text-center pa-3">{{ recipe.name }} Recipe</h3>
          <v-data-table
            dense
            style="border-radius: 0 0 10px 10px"
            :items="ingredients"
            :headers="headers"
          >
            <template v-slot:item.quantity="{ item }">
              <div>{{ item.quantity }} {{ item.unit }}</div>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      recipe: "hi",
      ingredients: [],
      headers: [
        { text: "Ingredient", value: "name", align: "center" },
        { text: "Quantity", value: "quantity", align: "center" },
        // { text: "Measurement", value: "unit" },
      ],
    };
  },
  filters: {
    dateFilter(value) {
      return moment(value).format("ll");
    },
  },
  methods: {
    getRecipe() {
      axios
        .get(
          `https://59esd0ee.directus.app/items/recipes/${this.$route.params.id}?fields=*.*.*`
        )
        .then((response) => {
          console.log("success", response.data);
          this.recipe = response.data.data;
          this.ingredients = response.data.data.ingredients;
          console.log(this.recipe);
          console.log("ingredients", this.ingredients);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    back() {
      this.$router.push({ name: "recipes" });
    },
  },
  mounted() {
    this.getRecipe();
  },
};
</script>

<style scoped>
.content {
  margin: 30px 0;
  text-align: center;
  background-color: white;
  border-radius: 10px;
}
.combo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 2px solid red; */
}
#r-main {
  background-color: #f6e4d1;
  min-height: calc(100vh - 56px);
  max-width: 100vw;
}
img {
  max-width: 90vw;
  border-radius: 10px;
}

#r-table {
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
}
@media (min-width: 795px) {
  #combo {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    width: 60%;
    /* border: 2px solid purple; */
    margin-top: 10px;
    min-height: 70vh;
  }
  .r-img {
    /* width: 50%; */
    /* border: 2px solid yellow; */
    display: flex;
    justify-content: center;
    width: 40%;
  }
  img {
    width: 100%;
    max-width: 35vw;
  }
  .combo-wrapper {
    /* border: 2px solid red; */
    flex-direction: row;
  }
  .content {
    margin: 0;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
