module.exports = {
  mode: 'development',
  entry: __dirname + '/public/js/main.js',
  output: {
    path: __dirname + '/public/build',
    filename: 'build.js'
  },
  devServer: {
    static: {
      directory: __dirname +'/public',
      watch: true,
    },
  }
}

