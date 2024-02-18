/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arizonia': ["'Arizonia'", 'cursive'],
        'lovers-quarrel': ["'Lovers Quarrel'", 'cursive'],
        'pangolin': ["'Pangolin'"],
      }
    },
  },
  plugins: [],
}

