export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  timeout: 5000,
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_ID}`
  }
})
