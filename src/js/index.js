import axiosWeather from './helpers/api/axiosWeather'
import { backgroundImage, changeBackground } from './helpers/backgroundImage'
import calcTemp from './helpers/calcTemp'
import dayInfo from './helpers/dayInfo'
import dayOrNight from './helpers/dayOrNight'
import geolocation from './helpers/geolocation'
import Toast from './helpers/Toast'

Vue.createApp({
  data () {
    return {
      current: null,
      temp: '--ºc',
      tempMin: '--ºc',
      tempMax: '--ºc',
      name: '----',
      icon: false,
      coord: [-33.4569, -70.6483],

      // days
      dailys: [],

      // info
      humidity: 0,
      pressure: 0,
      wind: 0,
      sys: null
    }
  },
  methods: {
    async success ({ coords }) {
      try {
        // hero
        const heroData = await axiosWeather.post(
          `weather?lat=${coords.latitude}&lon=${coords.longitude}`
        )

        this.temp = calcTemp(heroData.data.main.temp)
        this.tempMin = calcTemp(heroData.data.main.temp_min)
        this.tempMax = calcTemp(heroData.data.main.temp_max)
        this.name = heroData.data.name
        this.icon = `http://openweathermap.org/img/wn/${heroData.data.weather[0].icon}.png`
        changeBackground(
          await backgroundImage(
            `Weather ${heroData.data.weather[0].description} ${dayOrNight(
              heroData.data.sys.sunrise,
              heroData.data.sys.sunset,
              heroData.data.dt
            )}`
          )
        )

        // days

        const daysData = await axiosWeather.post(
          `onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=hourly,minutely,current,alerts`
        )
        this.dailys = await dayInfo(daysData.data.daily)

        // info

        this.humidity = `${heroData.data.main.humidity}%`
        this.pressure = `${heroData.data.main.pressure}hPa`
        this.wind = `sse ${heroData.data.wind.speed} km/h`
        this.sys = {
          sunrise: moment.unix(heroData.data.sys.sunrise).format('HH:MM:ss'),
          sunset: moment.unix(heroData.data.sys.sunset).format('HH:MM:ss')
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
      const heroData = await axiosWeather.post(
        `weather?lat=${this.coord[0]}&lon=${this.coord[1]}`
      )
      this.temp = calcTemp(heroData.data.main.temp)
      this.tempMin = calcTemp(heroData.data.main.temp_min)
      this.tempMax = calcTemp(heroData.data.main.temp_max)
      this.name = heroData.data.name
      this.icon = `http://openweathermap.org/img/wn/${heroData.data.weather[0].icon}.png`
      changeBackground()

      // days
      const daysData = await axiosWeather.post(
        `onecall?lat=${this.coord[0]}&lon=${this.coord[1]}&exclude=hourly,minutely,current,alerts`
      )
      this.dailys = await dayInfo(daysData.data.daily)

      // info

      this.humidity = `${heroData.data.main.humidity}%`
      this.pressure = `${heroData.data.main.pressure}hPa`
      this.wind = `sse ${heroData.data.wind.speed} km/h`
      this.sys = {
        sunrise: moment.unix(heroData.data.sys.sunrise).format('HH:MM:ss'),
        sunset: moment.unix(heroData.data.sys.sunset).format('HH:MM:ss')
      }
    },
    refresh () {
      location.reload()
    },
    gps () {
      geolocation(this.success, this.error)
    },
    async dataSearch (city) {
      try {
        // hero
        const heroData = await axiosWeather.post(`weather?q=${city}`)

        this.temp = calcTemp(heroData.data.main.temp)
        this.tempMin = calcTemp(heroData.data.main.temp_min)
        this.tempMax = calcTemp(heroData.data.main.temp_max)
        this.name = heroData.data.name
        this.icon = `http://openweathermap.org/img/wn/${heroData.data.weather[0].icon}.png`
        changeBackground(
          await backgroundImage(
            `Weather ${heroData.data.weather[0].description} ${dayOrNight(
              heroData.data.sys.sunrise,
              heroData.data.sys.sunset,
              heroData.data.dt
            )}`
          )
        )
        // days

        const daysData = await axiosWeather.post(
          `onecall?lat=${heroData.data.coord.lat}&lon=${heroData.data.coord.lon}&exclude=hourly,minutely,current,alerts`
        )
        this.dailys = await dayInfo(daysData.data.daily)

        // info

        this.humidity = `${heroData.data.main.humidity}%`
        this.pressure = `${heroData.data.main.pressure}hPa`
        this.wind = `sse ${heroData.data.wind.speed} km/h`
        this.sys = {
          sunrise: moment.unix(heroData.data.sys.sunrise).format('HH:MM:ss'),
          sunset: moment.unix(heroData.data.sys.sunset).format('HH:MM:ss')
        }
      } catch (error) {
        Toast('error', `No existe la ciudad ${city}`)
        this.dataDefault()
      }
    },
    search () {
      Swal.fire({
        title: 'Buscar por ciudad',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        backdrop: true,
        allowOutsideClick: false,
        confirmButtonText: 'Buscar',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        preConfirm: value => {},
        allowOutsideClick: () => !Swal.isLoading()
      }).then(async result => {
        if (result.isConfirmed) {
          this.dataSearch(result.value)
        }
      })
    }
  },
  created () {
    geolocation(this.success, this.error)
  }
}).mount('#app')
