import path from 'path'
import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientFolder = path.resolve(__dirname, '../client')

const compiler = webpack({
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'app.css',
      chunkFilename: 'app.css',
    }),
  ],
  entry: `${clientFolder}/index.js`,
  output: {
    globalObject: 'this',
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      },
      {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader'
            ],
        }
    ]
  }
})


export default middleware(compiler, {
  publicPath: '/'
})


