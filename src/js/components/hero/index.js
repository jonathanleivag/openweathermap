import axiosWeather from '../../helpers/api/axiosWeather'
import {
  backgroundImage,
  changeBackground
} from '../../helpers/backgroundImage'
import calcTemp from '../../helpers/calcTemp'
import dayOrNight from '../../helpers/dayOrNight'
import geolocation from '../../helpers/geolocation'
import Toast from '../../helpers/Toast'

Vue.createApp({
  data () {
    return {
      current: null,
      temp: '--ºc',
      tempMin: '--ºc',
      tempMax: '--ºc',
      name: '----',
      icon: false,
      coords: [-33.4569, -70.6483],
      image: ''
    }
  },
  methods: {
    async success ({ coords }) {
      try {
        const { data } = await axiosWeather.post(
          `weather?lat=${coords.latitude}&lon=${coords.longitude}`
        )
        this.temp = calcTemp(data.main.temp)
        this.tempMin = calcTemp(data.main.temp_min)
        this.tempMax = calcTemp(data.main.temp_max)
        this.name = data.name
        this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        changeBackground(
          await backgroundImage(
            `Weather ${data.weather[0].description} ${dayOrNight(
              data.sys.sunrise,
              data.sys.sunset,
              data.dt
            )}`
          )
        )
      } catch (error) {
        Toast('error', error.message)
        this.dataDefault()
      }
    },
    async error () {
      this.dataDefault()
      Toast()
    },
    async dataDefault () {
      const { data } = await axiosWeather.post(
        `weather?lat=${this.coords[0]}&lon=${this.coords[1]}`
      )
      this.temp = calcTemp(data.main.temp)
      this.tempMin = calcTemp(data.main.temp_min)
      this.tempMax = calcTemp(data.main.temp_max)
      this.name = data.name
      this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      changeBackground()
    }
  },
  created () {
    geolocation(this.success, this.error)
  }
}).mount('#hero')
