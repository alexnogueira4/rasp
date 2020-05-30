import express from "express";
import morgan from 'morgan'
import helmet from 'helmet'
var server:any = null

function start (api:any, Database:any, callback:any) {
  let database = new Database()
  const app = express()
  app.use(morgan('dev'))
  app.use(helmet())
  app.use((err:any, req:any, res:any) => {
    if (err) {
      callback(new Error('Something went wrong!, err:' + err,), req)
      res.status(500).send('Something went wrong!')
    }
  })
  database = database.connect()
  api(app, database)
  server = app.listen(process.env.PORT, () => callback(null, server))
}

function stop () {
  if (server) server.close()
  return true
}

export default { start, stop }
