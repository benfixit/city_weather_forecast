<template>
  <div class="hello">
    <ul id="cities-list">
     <li v-for="city in cities" :key="city.woeid">
        <router-link :to="{ name: 'Weather', params: { woeid: city.woeid }}">{{ city.title }}</router-link>
        <weather :woeid="city.woeid" :showfulldetails="showfulldetails" v-on:click.native="$router.push(`/weather/${city.woeid}`)"></weather>
    </li>
    </ul>
  </div>
</template>

<script>
import Weather from '@/components/Weather'

export default {
  name: 'Home',
  components: {
      Weather
  },
  data () {
    return {
      cities: [
          { title: 'Istanbul', woeid: 2344116 },
          { title: 'Berlin', woeid: 638242 },
          { title: 'London', woeid: 44418 },
          { title: 'Helsinki', woeid: 565346 },
          { title: 'Dublin', woeid: 560743 },
          { title: 'Vancouver', woeid: 9807 }
      ],
      showfulldetails: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
