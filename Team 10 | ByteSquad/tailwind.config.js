/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // faster compilation
  content: [
    "./views/**/*.{html,ejs}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#002500',
        'forest-green': '#4d8b31',
        'cream': '#ebeec6',
        'beige':'#fefae0',
        'olive-50':'#ccd5ae',
        'beige-50':'#e9edc9'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

