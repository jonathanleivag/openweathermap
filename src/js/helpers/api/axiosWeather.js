export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
  params: {
    appid: import.meta.env.VITE_API_WEATHER
  }
})
