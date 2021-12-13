export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: import.meta.env.VITE_API_WEATHER
  },
  timeout: 1000
})
