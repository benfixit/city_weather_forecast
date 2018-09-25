<template>
  <div id="app">
        <div class="navigation">
            <div class="left-nav">
                <router-link :to="{ name: 'Home' }">Home</router-link>
            </div>
            <div class="right-nav" style="width:48%; float: left;">    
                <input v-model="keyword" type="search" placeholder="Enter a city name">
                <button v-on:click="navigateTo()">Search</button>
            </div>
            <div class="clearfix" style="clear: both;"></div>  
        </div>
        <router-view/>
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

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .navigation{
     width: 100%; 
     padding: 2% 0;
}

#app .navigation .left-nav{
    width: 48%;
    float: left;
}

#app .navigation .left-nav a{
    color:#4397e6;
    text-decoration: none;
}

#app .navigation .left-nav a:hover,
#app .navigation .left-nav a:focus{
    color: red;
}

#app .navigation .right-nav{
    width: 48%;
    float: left;
}

#app .navigation .right-nav input{
    border-radius: 3px;
    padding: 1%;
}

#app .navigation .right-nav button{
    border-radius: 3px;
    padding: 1%;
    background-color: #4397e6;
    color: #ffffff;
}
</style>
