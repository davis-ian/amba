<template>
  <div id="home-main">
    <!-- <h1 class="text-center pa-3" style="font-family: 'Abril Fatface', cursive">
      AS MADE BY ALEX
    </h1> -->
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
      class="pa-5 pt-0 text-center"
    >
      <h1 class="mb-2" style="font-family: 'Abril Fatface', cursive">
        Featured
      </h1>
      <v-window continuous v-model="window">
        <v-window-item
          eager
          v-for="(item, index) in featured_posts"
          :key="index"
        >
          <div id="featured">
            <div @click="getDetails(item.id)" class="img">
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
            </div>
            <div class="content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.body }}</p>
              <v-btn dark @click="getDetails(item.id)">details</v-btn>
            </div>
          </div>
        </v-window-item>
      </v-window>
      <v-item-group v-model="window" class="text-center mt-2" mandatory>
        <v-item
          v-for="n in featured_posts.length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
    </div>
    <div id="side">
      <div
        v-for="(item, index) in featured_posts.slice(0, 3)"
        :key="index"
        class="f-side"
        @click="getFeatured(index)"
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
        <div
          style="
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <strong>{{ item.title }}</strong>
        </div>
      </div>
      <div id="f-more-btn">
        <v-btn width="95%" @click="getArticles" dark>More</v-btn>
      </div>
    </div>

    <!-- <v-btn @click="toggleModal">toggle</v-btn> -->

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Modal</v-card-title>
        <v-card-text>this is text</v-card-text>
        <v-data-table
          :items="featured_posts"
          :headers="postHeaders"
        ></v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      message: "my message",
      dialog: false,
      window: 0,
      featured_posts: [],
      postHeaders: [{ text: "Title", value: "title" }],
      scrollFeatured: true,
    };
  },
  mounted() {
    this.getPosts();
    this.incrementWindow();
  },
  methods: {
    getArticles() {
      this.$router.push({ name: `articles` });
    },
    getFeatured(index) {
      this.scrollFeatured = false;
      this.window = index;
    },
    toggleModal() {
      this.dialog = true;
    },
    incrementWindow() {
      if (this.scrollFeatured) {
        setTimeout(() => {
          // console.log("inc");
          if (this.window == this.featured_posts.length) {
            this.window = 0;
          } else {
            this.window++;
          }
          this.incrementWindow();
        }, 10000);
      }
    },
    getPosts() {
      axios
        .get("https://59esd0ee.directus.app/items/posts?filter[featured]=true")
        .then((response) => {
          console.log("success", response.data);
          this.featured_posts = response.data.data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    getDetails(id) {
      this.$router.push({ path: `/details/${id}` });
    },
  },
};
</script>

<style scoped>
#home-main {
  /* border: 2px solid green; */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px);
}
img:hover {
  cursor: pointer;
}
img {
  /* border: 2px solid blue; */
  border-radius: 10px 0 0 0;
  max-width: 100%;
  border-radius: 10px 10px 0 0;
}
#featured {
  background-color: white;
  /* border: 2px solid red;  */
  border-radius: 10px;
  margin-bottom: 10px;

  max-width: 80vw;
}
.content {
  /* border: 2px solid red; */

  padding: 20px;
}
#side {
  display: none;
}
@media (min-width: 795px) {
  /* #home-main {
    border: 2px solid red;
  } */
  #featured {
    /* border: 2px solid red; */
    border-radius: 10px;
    max-width: 80vh;
    display: flex;
    justify-content: center;
  }
  #side {
    display: block;
    height: 77.2vh;
    width: 25vw;
    margin-left: 50px;
    margin-top: 60px;
    /* border: 2px solid orange; */
    /* align-items: center; */
    /* background: white; */
    border-radius: 10px;
  }
  #f-more-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: white; */

    /* border: 2px solid black; */
  }
  .f-side {
    background-color: white;
    border-bottom: 1px solid lightgray;
    text-align: center;
    height: 25%;
    display: flex;
    margin: 10px;
    border-radius: 10px;
    position: relative;
    left: 0;
    transition: 0.3s;
  }
  .f-side:hover {
    cursor: pointer;
    /* background-color: lightgray; */
    transition: 0.3s;

    left: 20px;
  }

  .f-side img {
    max-width: 40%;
    border-radius: 10px 0 0 10px;
  }
  img {
    /* border: 2px solid pink; */
    object-fit: cover;
    border-radius: 10px 0 0 10px;
    height: 100%;
    width: 100%;
  }
  .img {
    width: 50%;
  }
  .content {
    /* border: 2px solid green; */
    /* padding-top: 50px; */
    border-radius: 0 10px 10px 0;
    background-color: white;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
