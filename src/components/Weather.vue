<template>
    <div>
        <div v-if="loading">
            <img src="/static/loading.gif" alt="Loading"/>
        </div>
        <div v-else>
            <div v-if="weather">
                <div v-if="showfulldetails !== false" class="full-details">
                    <p class="city">{{ weather.title }}</p>
                    <div v-for="day in weather.consolidated_weather" :key="day.the_temp" class="each-day">
                        <p class="day-of-week">{{ getDayOfTheWeek(day.applicable_date) }}</p>
                        <p>Temp: {{ day.the_temp | presentTemp }}&deg;C</p>
                        <p>Max: {{ day.max_temp | presentTemp }}&deg;C</p>
                        <p>Min: {{ day.min_temp | presentTemp }}&deg;C</p>
                        <p>
                            <img v-bind:src="'https://www.metaweather.com/static/img/weather/' + day.weather_state_abbr + '.svg'"
                                 width="50" height="50"/></p>
                    </div>
                </div>
                <div v-else class="basic-details">
                    <p class="city">{{ weather.title }}</p>
                    <p>Temp: {{ weather.consolidated_weather[0].the_temp | presentTemp }}&deg;C</p>
                    <p>Max: {{ weather.consolidated_weather[0].max_temp | presentTemp }}&deg;C</p>
                    <p>Min: {{ weather.consolidated_weather[0].min_temp | presentTemp }}&deg;C</p>
                    <p>
                        <img v-bind:src="'https://www.metaweather.com/static/img/weather/' + weather.consolidated_weather[0].weather_state_abbr + '.svg'"
                             width="50" height="50"/></p>
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
            getDayOfTheWeek: function (date) {
                let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Ssturday'];
                return daysOfTheWeek[new Date(date).getDay()];
            },

            fetchData() {
                let query = '';
                let woeid = this.woeid ? this.woeid : this.$route.params.woeid;
                query = 'command=location&woeid=' + woeid;
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
                return Math.round(value);
            }
        }
    }
</script>

<style scoped>
    .full-details .city {
        padding: 1% 2%;
        font-size: 2em;
        text-align: left;
    }

    .full-details .each-day {
        width: 16%;
        float: left;
    }

    .full-details .each-day p.day-of-week {
        font-weight: 400;
        color: #006;
    }

    .basic-details {
        width: 16%;
        float: left;
    }

    .basic-details .city {
        font-size: 1.2em;
        font-weight: 800;
    }
</style>
