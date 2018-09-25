<template>
  <div class="home">
    <div v-for="city in cities" :key="city.woeid" class="city">
        <weather :woeid="city.woeid" :showfulldetails="showfulldetails" v-on:click.native="$router.push(`/weather/${city.woeid}`)"></weather>
    </div>
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

.home .city{
    padding-left: 1%;
    width: 15%;
    float: left;
}

</style>
