const path = require('path');

// const buildEslintCommand = (filenames) =>
//   `next lint --fix --file ${filenames
//     .map((f) => path.relative(process.cwd(), f))
//     .join(' --file ')}`;
// const buildTsCommand = (filenames) =>
//   `tsc-files ${filenames
//     .map((f) => path.relative(process.cwd(), f))
//     .join(' ')} -p ${path.relative(process.cwd(), 'tsconfig.json')}`;

module.exports = {
  // 'src/**/*.{js,jsx,ts,tsx,json}': [buildEslintCommand],
  'src/**/*.{js,jsx,ts,tsx,json}': 'eslint',
  // 'src/**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit', // Comment this line if u resolve conflict make u can't not commit
  'src/**/*.{js,jsx,ts,tsx,json,css,scss}': ['prettier --write'],
};
