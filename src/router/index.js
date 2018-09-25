import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Weather from '@/components/Weather'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/weather/:woeid',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search
    }
  ]
})
