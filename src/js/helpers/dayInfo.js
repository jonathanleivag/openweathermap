import calcTemp from './calcTemp'
moment.locale('es')

export default async function dayInfo (dailys) {
  let data = []
  for await (let element of dailys) {
    data = [
      ...data,
      {
        max: calcTemp(element.temp.max),
        min: calcTemp(element.temp.min),
        icon: `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`,
        day: moment.unix(element.dt).format('dddd')
      }
    ]
  }
  return data
}
