import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { loadCache } from 'axios-hooks'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import { StaticRouter } from 'react-router'

loadCache(window.__AXIOS_HOOKS_CACHE__)

delete window.__AXIOS_HOOKS_CACHE__

ReactDOM.hydrate(<BrowserRouter forceRefresh={true}><Switch><Route exact path="/news" component={App} ></Route><Route path="/news/:page" component={App} ></Route></Switch></BrowserRouter>, document.getElementById('root'))
