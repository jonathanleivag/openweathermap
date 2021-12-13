import axiosUnsplash from './api/axiosUnsplash'

export async function backgroundImage (name) {
  let image = ''
  try {
    const { data } = await axiosUnsplash.get(
      `search/photos?page=1&query=${name}`
    )
    image = data.results[0].links.download
  } catch (error) {
    console.error('Algo salio mal')
  }
  return image
}

export async function changeBackground (image = '') {
  const body = document.querySelector('body')
  if (image === '') {
    body.classList.add('bg-bgDefault')
  } else {
    body.classList.remove('bg-bgDefault')
    body.style.backgroundImage = `url(${image})`
  }
  console.log(image)
}
