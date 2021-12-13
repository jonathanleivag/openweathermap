export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  timeout: 1000,
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_ID}`
  }
})
