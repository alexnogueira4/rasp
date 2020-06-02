import "./config/env"
import Database from './config/database'
import server from './server/server'
import rooms from './api/rooms'
// import eletronicTypes from './api/eletronicTypes'

server.start(rooms, Database, (err:any, app:any) => {
  if (err || app) {
    console.log('Started rooms')
  }
})

// server.start(eletronicTypes, Database, (err:any, app:any) => {
//   if (err || app) {
//     console.log('Started eletronic types')
//   }
// })
