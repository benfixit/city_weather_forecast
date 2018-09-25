<template>
  <div v-if="loading">
      <img src="/static/loading.gif" alt="Loading"/>
  </div>
  <div v-else class="loaded">
      <div v-if="searchResult.length != 0">
        <div v-for="city in searchResult" :key="city.woeid">
             <weather :woeid="city.woeid" :showfulldetails="showfulldetails"></weather>
        </div>        
      </div>
      <div v-else>
        <h4 class="no-result">No results were found. Try changing the keyword</h4>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import Weather from '@/components/Weather'

export default {
  name: 'Search',
  components: {
      Weather
  },

  data: function() {
      return {
          searchResult: {},
          loading: true,
          showfulldetails: false,
      }
  },

  created() {
      this.fetchData();
    },

    watch: {
      '$route': 'fetchData',
    },

    methods: {
      fetchData() {
          let keyword = this.$route.params.keyword ? this.$route.params.keyword : '';
          let query = 'command=search&keyword='+keyword;
        axios.get('/static/weather.php?' + query)
        .then((resp) => {
            this.searchResult = resp.data;
            this.loading = false;
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
}
</script>

<style scoped>
    .loaded .no-result{
        color:crimson;
    }
</style>

