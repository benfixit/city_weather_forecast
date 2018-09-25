<template>
  <div v-if="loading">
      <img src="/static/loading.gif" alt="Loading"/>
  </div>
  <div v-else>
      <div v-if="searchResult.length != 0">
        <ul>
            <li v-for="city in searchResult" :key="city.woeid">
                <router-link :to="{ name: 'Weather', params: { woeid: city.woeid }}">{{ city.title }}</router-link>
                <weather :woeid="city.woeid" :showfulldetails="showfulldetails"></weather>
            </li>
        </ul>
      </div>
      <div v-else>
        <h4>No results were found. Try changing the keyword</h4>
      <!--<weather :keyword="keyword"></weather>-->
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
