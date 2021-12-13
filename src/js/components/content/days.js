import axiosWeather from '../../helpers/api/axiosWeather'
import dayInfo from '../../helpers/dayInfo'
import geolocation from '../../helpers/geolocation'
import Toast from '../../helpers/Toast'

Vue.createApp({
  data () {
    return {
      coords: [-33.4569, -70.6483],
      dailys: []
    }
  },
  methods: {
    async success ({ coords }) {
      try {
        const { data } = await axiosWeather.post(
          `onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=hourly,minutely,current,alerts`
        )
        this.dailys = await dayInfo(data.daily)
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
        `onecall?lat=${this.coords[0]}&lon=${this.coords[1]}&exclude=hourly,minutely,current,alerts`
      )
      this.dailys = await dayInfo(data.daily)
      moment.locale('es')
      const current = moment.unix(data.daily[0].dt).format('dddd')
      console.log(current)
    }
  },
  created () {
    geolocation(this.success, this.error)
  }
}).mount('#day')
