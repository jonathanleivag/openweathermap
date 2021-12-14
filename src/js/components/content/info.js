import axiosWeather from '../../helpers/api/axiosWeather'
import geolocation from '../../helpers/geolocation'
import Toast from '../../helpers/Toast'

Vue.createApp({
  data () {
    return {
      humidity: 0,
      pressure: 0,
      wind: 0,
      sys: null
    }
  },
  methods: {
    async success ({ coords }) {
      try {
        const { data } = await axiosWeather.post(
          `weather?lat=${coords.latitude}&lon=${coords.longitude}`
        )

        this.humidity = `${data.main.humidity}%`
        this.pressure = `${data.main.pressure}hPa`
        this.wind = `sse ${data.wind.speed} km/h`
        this.sys = {
          sunrise: moment.unix(data.sys.sunrise).format('HH:MM:ss'),
          sunset: moment.unix(data.sys.sunset).format('HH:MM:ss')
        }
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
    }
  },
  created () {
    geolocation(this.success, this.error)
  }
}).mount('#info')
