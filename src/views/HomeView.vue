<template>
  <div id="home">
    <home-page></home-page>
    <!-- <mood-component></mood-component> -->
  </div>
</template>

<script>
import HomePage from "../components/HomePage.vue";
// import MoodComponent from "../components/MoodComponent.vue";

export default {
  name: "HomeView",

  components: {
    HomePage,
    // MoodComponent,
  },
};
</script>

<style>
#home {
  border: 2px solid #f6e4d1;
  background-color: #f6e4d1;
}
</style>
