const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    controller: path.join(__dirname, 'recipe', 'src', 'model.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};
