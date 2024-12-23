// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     typography: {},
//   },
// };
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('typography'), // <- Here is the issue
  ],
};