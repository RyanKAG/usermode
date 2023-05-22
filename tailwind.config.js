/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  
  theme: {
   
    extend: {
      fontFamily: {
        primary: ['Cairo'],
      },
      colors: {
        hemmaGrad1: '#1c1c28',
        hemmaGrad2: '#28293d',
        dashboardBg: '#1c1c28',
        sidebarBg: '#28293d',
        sidebarDark:'#28293d',
        primary: '#2969b3',
        secondary: '#555770',
        disabled: '#333333',
        warning: '#C86611',
        danger: '#F05252',
        success: '#428879',
        button:'#736b61',
        hemmaAlt:'#812a8b'
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.arrow-hide':{
          '&::-webkit-inner-spin-button':{
            '-webkit-appearance': 'none',
            'margin': 0
          },
          '&::-webkit-outer-spin-button':{
            '-webkit-appearance': 'none',
            'margin': 0
          },
        }
      }
      )
    })
  ],
}
