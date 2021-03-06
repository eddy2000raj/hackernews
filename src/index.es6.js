import path from 'path'
import express from 'express'
var cors = require('cors');

import bundleMiddlware from './middleware/bundle'
import ssr from './routes/ssr'

const app = express()
const publicFolder = path.resolve(__dirname, '../public')
app.use(cors())
app.use(express.static(publicFolder, { index: [] }))
app.use(bundleMiddlware)
app.get('/news*', ssr)
app.listen(process.env.PORT || 8080)
