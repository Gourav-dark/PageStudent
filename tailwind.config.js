/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-theme':'',
        'dark-text':'',
        
        'normal':'#bccbde',
        'normal-text':'#000'
      },
      animation: {
        'change-size': 'changesize 5s linear infinite',
      },
      keyframes: {
        changesize: {
          '0%' :{ width:'0%'},
          '100%': { width:'100%' }
        }
      }
    },
  },
  plugins: [],
}

