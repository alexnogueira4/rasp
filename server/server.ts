import express from "express";
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'


var server:any = null

function start (api:any, Database:any, callback:any) {
  let database = new Database()
  const app = express()
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  // app.use((req:any, res, err) => {
  //   if (err) {
  //     callback(new Error('Something went wrong!, err:' + err,), req)
  //     res.status(500)
  //        .send('Something went wrong!')
  //   }
  // })
  database = database.connect()
  new api(app, database)
  server = app.listen(process.env.PORT, () => callback(null, server))
}

function stop () {
  if (server) server.close()
  return true
}

export default { start, stop }
