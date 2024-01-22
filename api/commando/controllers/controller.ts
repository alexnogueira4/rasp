import shelljs from 'shelljs';
import Client from '../../../clients/chromecast/client'

enum CommandoEnum {
  restart,
  stop,
  start
};

class Controller {
  client: any;
  connection: any;
  mediaServer: any;

  protected database: any;

  constructor(database: any) {
    this.client = new Client()
    this.connect(database)
  }

  private async connect(database) {
    await database.connect()
    this.connection = database.connection
  }

  private async serverRunCommando(commando: CommandoEnum) {
    await shelljs.exec(`pm2 ${commando} rasp`, { async: true, silent: false });
  }

  public async runCommando(req: any, res: any) {
    const { commando } = req.params

    try {
      await this.serverRunCommando(commando);
      res.json({
        message: "Restarting server..."
      })
    } catch (error) {
      console.log(`Error trying to run commando the server: ${commando}`, error)
      throw error
    }
  }
}

export default Controller