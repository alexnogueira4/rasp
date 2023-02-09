var server:any = null

function start (app, api:any, Database:any, callback:any) {
  new api(app, Database)
  callback.apply()
}

function stop () {
  if (server) server.close()
  return true
}

export default { start, stop }
