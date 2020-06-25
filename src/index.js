require('@babel/register')({
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', { targets: { node: true } }]
  ]
})

require('./index.es6.js')
