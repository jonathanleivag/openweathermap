module.exports = {
  content: [
    './src/**/*.{html,js}',
    './index.html',
    './src/js/helpers/backgroundImage.js'
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        bgDefault:
          'url(https://cdn.pixabay.com/photo/2019/05/19/23/47/clouds-4215608_960_720.jpg)'
      })
    }
  },
  plugins: []
}
