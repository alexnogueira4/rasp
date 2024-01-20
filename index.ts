import "./config/env"
import Database from './config/database'
import server from './server/server'
// import rooms from './api/rooms'
// import eletronics from './api/eletronics'
import {Entertainment, Commando} from './api'
import express from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'

// const database = new Database().connect()
const database = new Database()
const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// server.start(app, rooms, database, () => { console.log('Started rooms') })
// server.start(app, eletronics, database, () => { console.log('Started eletronic') })
server.start(app, Entertainment, database, () => { console.log('Started eletronic') })
server.start(app, Commando, database, () => { console.log('Started eletronic') })

app.listen(process.env.PORT, () => {
  console.log('teste funcional, porta: ', process.env.PORT);
})
