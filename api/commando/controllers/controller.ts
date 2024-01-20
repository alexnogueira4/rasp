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
    shelljs.exec(`pm2 ${commando} rasp`, { async: true, silent: false });
  }

  public runCommando(req: any, res: any): void {
    const { commando } = req.params

    try {
      this.serverRunCommando(commando);
    } catch (error) {
      console.log(`Error trying to run commando the server: ${commando}`, error)
    }
  }
}

export default Controller