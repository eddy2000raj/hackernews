import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Router from 'express-promise-router'
import { serializeCache } from 'axios-hooks'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import newsApp from '../reducer'
import { StaticRouter } from 'react-router'

import App from '../client/App'

const router = new Router()

const publicFolder = path.resolve(__dirname, '../../public')

// on the server
const context = {};

router.use(async (req, res) => {

  const index = fs.readFileSync(`${publicFolder}/index.html`, 'utf8');

  ReactDOM.renderToString(<StaticRouter context={context}><App/></StaticRouter>);

  const cache = await serializeCache();

  const html = ReactDOM.renderToString(<StaticRouter context={context}><App/></StaticRouter>)

  res.send(
    index
      .replace('{{{html}}}', html)
      .replace('{{{cache}}}', JSON.stringify(cache).replace(/</g, '\\u003c'))

  )
})

export default router
