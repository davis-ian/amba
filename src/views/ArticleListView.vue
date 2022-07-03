<template>
  <div id="al-main">
    <div class="ma-5 text-center">
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
            >{{ category.name }}</v-chip
          >
        </span>
      </div>
    </div>
    <h1 class="text-center abril">Articles</h1>
    <div id="a-wrapper" class="ma-3">
      <div
        v-for="(item, index) in articles"
        :key="index"
        class="elevation-3 article"
        @click="getDetails(item)"
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
        <span v-if="item.title" class="text-center article-title">
          <strong>{{ item.title }}</strong>
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
      articles: [],
      showCategories: false,
      categories: [],
      selectedCategories: [],
      filteredArticles: [],
    };
  },
  mounted() {
    this.getArticles();
    this.getCategories();
  },
  watch: {
    selectedCategories() {
      if (this.selectedCategories.length > 0) {
        this.getFilteredArticles();
      } else {
        this.getArticles();
      }
    },
  },
  methods: {
    getFilteredArticles() {
      var filter_string = "";
      for (let i = 0; i < this.selectedCategories.length; i++) {
        filter_string += `&filter[categories_id][_in]=${this.selectedCategories[i]}`;
      }
      console.log(filter_string);
      axios
        .get(
          `https://59esd0ee.directus.app/items/categories_posts?&fields=*.*.*${filter_string}`
        )
        .then((response) => {
          console.log("filter success", response.data.data);
          this.articles = [];
          for (let i = 0; i < response.data.data.length; i++) {
            // console.log(response.data.data[i]);
            if (response.data.data[i].posts_id !== null) {
              console.log(response.data.data[i].posts_id, "post");
              this.articles.push({
                ...response.data.data[i].posts_id,
                pic: response.data.data[i].posts_id.pic?.id
                  ? response.data.data[i].posts_id.pic?.id
                  : "",
              });
            }
          }

          console.log(this.articles, "ARTICLES");

          // console.log(this.articles, "reg");
        })
        .catch((error) => {
          console.log("error", error);
        });
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
    toggleShowCategories() {
      this.showCategories = !this.showCategories;
    },
    getDetails(item) {
      this.$router.push({ path: `/details/${item.id}` });
    },
    getArticles() {
      axios
        .get("https://59esd0ee.directus.app/items/posts")
        .then((response) => {
          console.log("success", response.data.data);
          this.articles = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    getCategories() {
      axios
        .get("https://59esd0ee.directus.app/items/categories")
        .then((response) => {
          console.log("success", response.data.data);
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
.article {
  background-color: white;
  border-radius: 10px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 70vw;
  margin: 30px 10px;
  /* border: 2px solid pink; */
}
img {
  border-radius: 10px 10px 0 0;
  max-width: 100%;
}
.article:hover {
  cursor: pointer;
  transition: 0.3s;
}
.article-title {
  padding: 10px;
}
.c-btn:hover {
  cursor: pointer;
}
#a-wrapper {
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#al-main {
  background-color: #f6e4d1;
  min-height: calc(100vh - 56px);
  padding: 20px 0;
  /* border: 2px solid green; */
}

@media (min-width: 795px) {
  .article {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    position: relative;
    bottom: 0;
  }
  .article:hover {
    bottom: 20px;
    transition: 0.3s;
  }
  .article img {
    max-height: 400px;
    object-fit: cover;
  }
  #a-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;
  }
}
</style>
