/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    backgroundColor: [
      'responsive',
      'odd',
      'even',
      'hover',
      'focus',
      'group-hover',
    ],
    backgroundOpacity: ['responsive', 'odd', 'even', 'hover', 'focus'],
    padding: ['responsive'],
    textAlign: ['responsive', 'first', 'last'],
  },

  theme: {
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0.05em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    screens: {
      sm: '640px', // was 640px
      md: '1000px', //was 768px
      lg: '1024px',
      xl: '1280px',
      xs: '400px',
    },
    fontFamily: {
      display: ['Poppins', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {

        light: "#FCFCFC",

        primary: {
          DEFAULT: '#094938',
          light: '#CCF3E5',
        },

        secondary: {
          DEFAULT: '#27AE60',
        },

        tertiary: {
          DEFAULT: '#FFC501',
          light: '#FFF3CC',
        },
        accent: {
          DEFAULT: '#FA417E',
          light: '#FFF0F5',
        },

        info: {
          DEFAULT: '#2C86F4',
          light: '#EBF4FF',
        },

        success: {
          DEFAULT: '#219653',
          hover: '#169200',
          pressed: '#188006',
          disabled: '#D5FFCD',
        },

        warning: {
          DEFAULT: '#F39C36',
          hover: '#E69700',
          pressed: '#E67C00',
          disabled: '#FDD485',
        },

        error: {
          DEFAULT: '#EA4E4B',
          light:'#FFD6D6'
        },

        dark: {
          DEFAULT: '#373F53',
          50: '#F4F4F4',
          100: '#E0E0E0',
          200: '#C2C4C7',
          300: '#848B9A',
          400: '#646A78',
          500: '#373F53',
          600: '#0F1424',
          700: '#090D18',
        },
      },
      spacing: {
        90: '20rem',
        96: '24rem',
        98: '28rem',
        100: '30rem',
        128: '32rem',
        easispace: '11rem',
      },
      minHeight: {
        'screen-75': '75vh',
      },
      width: {
        'w-30': '30%',
        'w-9': '9%',
        'w-2': '2%',
        'w-5': '5%',
      },
      inset: {
        '-100': '-100%',
        '-225-px': '-225px',
        '-160-px': '-160px',
        '-150-px': '-150px',
        '-94-px': '-94px',
        '-50-px': '-50px',
        '-29-px': '-29px',
        '-20-px': '-20px',
        '25-px': '25px',
        '40-px': '40px',
        '95-px': '95px',
        '145-px': '145px',
        '195-px': '195px',
        '210-px': '210px',
        '260-px': '260px',
      },
      height: {
        '95-px': '95px',
        '70-px': '70px',
        '350-px': '350px',
        '500-px': '500px',
        '600-px': '600px',
        '192-px': '192px',
      },
      maxHeight: {
        '860-px': '860px',
      },
      maxWidth: {
        '100-px': '100px',
        '120-px': '120px',
        '150-px': '150px',
        '180-px': '180px',
        '200-px': '200px',
        '210-px': '210px',
        '580-px': '580px',
      },
    },
  },
  plugins: [],
}

