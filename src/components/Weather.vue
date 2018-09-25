
<template>
  <div>
      <div v-if="loading">
          <img src="/static/loading.gif" alt="Loading"/>
      </div>
      <div v-else>
        <div v-if="weather">
            <div v-if="showfulldetails !== false">
                <p>City: {{ weather.title }}</p>
                <div v-for="day in weather.consolidated_weather" :key="day.the_temp">
                    <p>{{ getDayOfTheWeek(day.applicable_date) }}</p>
                    <p>Temperature: {{ day.the_temp | presentTemp }}</p>
                    <p>Maximum Temperature: {{ day.max_temp | presentTemp }}</p>
                    <p>Minimum Temperature: {{ day.min_temp | presentTemp }}</p>
                    <p>Icon: <img v-bind:src="'https://www.metaweather.com/static/img/weather/' + day.weather_state_abbr + '.svg'" width="50" height="50"/></p>
                </div>
            </div>
            <div v-else>
                <p>{{ getDayOfTheWeek(weather.consolidated_weather[0].applicable_date) }}</p>
                <p>Temperature: {{ weather.consolidated_weather[0].the_temp | presentTemp }}</p>
                <p>Maximum Temperature: {{ weather.consolidated_weather[0].max_temp | presentTemp }}</p>
                <p>Minimum Temperature: {{ weather.consolidated_weather[0].min_temp | presentTemp }}</p>
                <p>Icon: <img v-bind:src="'https://www.metaweather.com/static/img/weather/' + weather.consolidated_weather[0].weather_state_abbr + '.svg'" width="50" height="50"/></p>
            </div>    
        </div>
        <div v-else>
            <h5>No result found. Please try another city</h5>
        </div>    
      </div>   
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Weather',

    props: ['keyword', 'woeid', 'showfulldetails'],

    data() {
      return {
        weather: {},
        keywordSearch: false,
        loading: true,
      }
    },

    created() {
      this.fetchData();
    },

    watch: {
      '$route': 'fetchData',
    },

    methods: {
        getDayOfTheWeek: function(date) {
            let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Ssturday'];
            return daysOfTheWeek[new Date(date).getDay()];
        },

      fetchData() {
          let query = '';
          let woeid = this.woeid ? this.woeid : this.$route.params.woeid;
          if(woeid){
              query = 'command=location&woeid='+woeid;
          }else{
              query = 'command=search&keyword='+this.$route.params.keyword;
          }

        axios.get('/static/weather.php?' + query)
        .then((resp) => {
            this.weather = resp.data;
            this.loading = false;
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },

    filters: {
        presentTemp: function (value) {
            return Math.round(value) + ' C';
        }
    }
  }
</script>