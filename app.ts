import "./config/env"
import Database from './config/database'
import server from './server/server'
// const movies = require('./api/teste')
import rooms from './api/rooms'

server.start(rooms, Database, (err:any, app:any) => {
  if (err || app) {
    console.log('just started')
  }
})

