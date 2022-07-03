<template>
  <div>
    <div class="pa-3">
      <h2 class="mb-3 text-center">I'm in the mood for</h2>
      <v-row>
        <v-col style="display: flex; flex-direction: column">
          <v-btn dark class="mb-3">test</v-btn>
          <v-btn dark class="mb-3">test</v-btn>
          <v-btn dark class="mb-3">test</v-btn>
        </v-col>
        <v-col style="display: flex; flex-direction: column">
          <v-btn dark class="mb-3">test</v-btn>
          <v-btn dark class="mb-3">test</v-btn>
          <v-btn dark class="mb-3">test</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "im in the mood for",
    };
  },
};
</script>

<style></style>
