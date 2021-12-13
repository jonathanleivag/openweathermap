export default function geolocation (success, error) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  }
}
