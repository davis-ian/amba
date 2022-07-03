<template>
  <v-app>
    <v-app-bar elevation="0" app>
      <v-btn @click="toggleDrawer" text
        ><font-awesome-icon icon="fa-solid fa-bars"
      /></v-btn>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <h3 @click="goHome()" style="font-family: 'Abril Fatface', cursive">
          <span id="h-short">AMBA</span>
          <span id="h-long">AS MADE BY ALEX</span>
        </h3>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn id="search-btn" @click="toggleSearch" text
        ><font-awesome-icon icon="fa-solid fa-magnifying-glass"
      /></v-btn> -->
    </v-app-bar>

    <v-navigation-drawer id="drawer" v-model="drawer" fixed temporary>
      <div style="position: absolute; top: 20px; left: 20px">
        <font-awesome-icon @click="toggleDrawer" icon="fa-solid fa-xmark" />
      </div>
      <div class="menu">
        <h1 class="menu-item" @click="goHome()">Home</h1>
        <h1 class="menu-item" @click="goArticles()">Articles</h1>
        <h1 class="menu-item" @click="goRecipes()">Recipes</h1>
        <!-- <h1>Search</h1> -->
      </div>
    </v-navigation-drawer>

    <v-main>
      <div
        @click="checkOutside()"
        :class="['search-pop', { opac: !searchModal }]"
      >
        <v-expand-x-transition mode="in">
          <!-- <v-dialog transition="expand-x-transition" absolute v-model="searchModal"> -->
          <v-card style="z-index: 1" v-show="searchModal" class="mx-auto pa-3">
            <div style="display: flex; flex-direction: column" class="ma-3">
              <v-text-field
                dense
                hide-details
                label="Search"
                solo
                v-model="searchText"
                clearable
              >
              </v-text-field>
              <v-btn class="mt-3" color="secondary" type="submit"> Go </v-btn>
              <!-- <v-btn text>go</v-btn> -->
            </div>
          </v-card>
          <!-- </v-dialog> -->
        </v-expand-x-transition>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    searchModal: false,
    searchText: "",
    //
  }),
  mounted() {
    this.checkOutside();
  },
  methods: {
    goHome() {
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      } else {
        this.drawer = false;
      }
    },
    goRecipes() {
      if (this.$route.name !== "recipes") {
        this.$router.push({ name: "recipes" });
      } else {
        this.drawer = false;
      }
    },
    goArticles() {
      if (this.$route.name !== "articles") {
        this.$router.push({ name: "articles" });
      } else {
        this.drawer = false;
      }
      // console.log(this.$router);
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    toggleSearch() {
      this.searchModal = !this.searchModal;
    },
    checkOutside() {
      const concernedElement = document.querySelector(".search-pop");
      const searchBtn = document.querySelector("#search-btn");

      document.addEventListener("mousedown", (event) => {
        if (
          concernedElement.contains(event.target) ||
          searchBtn.contains(event.target)
        ) {
          // console.log("Clicked Inside");
        } else {
          this.searchModal = false;
        }
      });
    },
  },
};
</script>

<style>
.abril {
  font-family: "Abril Fatface", "cursive" !important;
}
.search-pop {
  height: 20vh;
  position: fixed;
  width: 100vw;
  z-index: 1;
}
.opac {
  opacity: 0;
  z-index: -1;
  transition: 0.3s;
}
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}
.menu-item {
  /* border: 2px solid red; */
  width: 80%;
  text-align: center;
  border-radius: 10px;
}
.menu-item:hover {
  /* border: 2px solid blue; */
  background-color: rgba(211, 211, 211, 0.57);
  cursor: pointer;
  /* background-color: black; */
}

#drawer {
  /* border: 2px solid red; */
  width: 100vw !important;
  height: 100vh !important;
}
#h-short {
  display: block;
  cursor: pointer;
}
#h-long {
  display: none;
}

@media (min-width: 795px) {
  #drawer {
    width: 30vw !important;
    height: 100vh !important;
    /* border: 2px solid red; */
  }
  #h-short {
    display: none;
  }
  #h-long {
    display: block;
    cursor: pointer;
  }
}
</style>
