<template>
  <main class="flex-fill">
    <app-nav></app-nav>
      <b-row class="noMargin">
        <b-col :cols="$store.getters.isAuth ? '9':'12'">
          <router-view class="main-content"/>
        </b-col>
        <b-col cols="3" class="eventsRight" v-if="$store.getters.isAuth">
          <events-log></events-log>
        </b-col>
      </b-row>
  </main>
</template>

<script>
  export default {
    computed: {
      isAuth () {
        return this.$store.getters.isAuth;
      },
    },
    created() {
      this.$store.dispatch('authenticate');
    },
  }
</script>

<style lang="scss">
  @import "assets/sass/app.scss";
</style>
