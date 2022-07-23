const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    fontFamily: {
      display: ['Poppins', 'Arial', 'sans-serif'],
      body: ['Inter', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
