const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      body: ['Lato', 'Arial', 'sans-serif'],
    },
    colors: {
      primary: {
        light: '#126FA5',
        DEFAULT: '#0C4A6E',
        dark: '#062537',
      },
      secondary: {
        light: '#429E70',
        DEFAULT: '#307352',
        dark: '#1E4833',
      },
      info: {
        light: '#00D4F5',
        DEFAULT: '#009FB7',
        dark: '#006A7A',
      },
      danger: {
        light: '#F29891',
        DEFAULT: '#EC645B',
        dark: '#E53124',
      },
      neutral: {
        lighter: '#FFFFFF',
        'light-2': '#F5F4F4',
        'light-1': '#ECEAEA',
        DEFAULT: '#D6D2D2',
        'dark-1': '#C5BFBF',
        'dark-2': '#A89F9F',
        'dark-3': '#999999',
        'dark-4': '#333333',
        darker: '#1F1F1F',
      },
    },
    extend: {},
  },
  plugins: [],
};
