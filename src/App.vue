<template>
  <div id="app">
      <div class="navigation">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <input v-model="keyword" type="search" placeholder="Enter a city name">
        <button v-on:click="navigateTo()">Search</button>
        <router-view/>
      </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather'
import Search from '@/components/Search'

export default {
  name: 'App',

  components: {
      Weather, Search
  },

  data: function(){
      return {
          keyword: ''
      }
  },
  methods: {
      navigateTo: function(){
          this.$router.push({ path: `/search/${this.keyword}` })
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
