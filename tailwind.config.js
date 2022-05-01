module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [
    './src/**/*.vue'
  ],

  theme: {
    extend: {
      animation: {
        'loading-translate-100': 'loadingTranslateIn 1.5s ease-in infinite 500ms',
        'loading-translate-200': 'loadingTranslateIn 1.5s ease-in infinite 700ms',
        'loading-translate-300': 'loadingTranslateIn 1.5s ease-in infinite 800ms',
        'loading-scale-100': 'loadingScaleIn 3s linear infinite 500ms'
      },
      keyframes: {
        loadingTranslateIn: {
          '30%': {
            transform: 'rotateX(60deg) rotateY(0deg) rotateZ(45deg) translateZ(20px) scale(0.95)',
            opacity: '0.25'
          },
          '100%': {
            transform: 'rotateX(65deg) rotateY(0deg) rotateZ(45deg) translateZ(0px) scale(0.85);',
            opacity: '0'
          }
        },
        loadingScaleIn: {
          '80%': {
            transform: 'rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1.25)',
            opacity: '0.1'
          },
          '100%': {
            transform: 'rotateX(65deg) rotateY(0deg) rotateZ(45deg) scale(1)',
            opacity: '0'
          }
        }
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem'
      },
      inset: {
        0: 0,
        1: '0.25rem',
        2: '0.50rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.50rem',
        '1/2': '50%'
      },
      opacity: {
        0: '0',
        25: '.25',
        75: '.75',
        10: '.1',
        20: '.2',
        30: '.3',
        40: '.4',
        50: '.5',
        60: '.6',
        70: '.7',
        80: '.8',
        90: '.9',
        100: '1'
      },

      fontFamily: {
        primary: 'Open Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        secondary: 'Ubuntu, Gilroy, Open Sans, sans-serif'
      },
      boxShadow: {
        filters: 'inset 0 -10px 10px -10px #00000033'
      },
      fontSize: {
        xxs: '11px',
        3.5: '14px',
        '3.5xl': '2rem'
      },
      colors: {
        bg: {
          100: '#F6F8FA',
          900: '#001D30'
        },
        grey: {
          100: '#F3F4F5',
          200: '#DAE3E9',
          300: '#CED3D6',
          400: '#A9B1B8',
          500: '#8B979E',
          700: '#3A5161',
          800: '#1A3547',
          900: '#00131F',
          1000: '#000123'
        },
        blue: {
          400: '#0970e6',
          carrefour: '#235695'
        },
        red: {
          300: '#E56F70'
        },
        green: {
          400: '#1AB895'
        }
      },
      listStyleType: {
        circle: 'circle'
      }
    }
  },
  variants: {
    display: ['responsive', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: []
}
