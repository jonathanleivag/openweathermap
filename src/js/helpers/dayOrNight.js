export default function dayOrNight (sunrise, sunset, dt) {
  const current = moment.unix(dt).format('HH')
  const day = moment.unix(sunrise).format('HH')
  const night = moment.unix(sunset).format('HH')
  let momentDay = ''

  if (current >= day && current < night) {
    momentDay = 'day'
  } else {
    momentDay = 'night'
    const spansHtml = document.querySelectorAll('span')
    spansHtml.forEach(span => {
      span.style.color = '#FFFFFF'
    })
  }
  return momentDay
}
