import Client from '../../clients/chromecast/client'
import MediaServer from './mediaServer'
import { getDateTime, diffTime, timeToSeconds, isUrl } from '../utils'
export default class Entertainment {
  client: any;
  device: any;
  connection: any;
  constructor(options) {
    this.connection = options.connection
    const mediaServer = new MediaServer({})
    this.client = new Client()
    mediaServer.start();
    console.log("index mediaserver")
    this.onDevice()
  }

  onDevice() {
    this.client.on('device', ( device )=>{
      this.device = device
      const t = this.playMedia()
    })
  }
  
  async playMedia() {
    if (this.device) {

      const channelGrid = await this.getChannelGrid(this.device.friendlyName)
      if(!channelGrid) {
        return false
      }
      let media;
      if (channelGrid.file) {
        media = isUrl(channelGrid.file) ? channelGrid.file : process.env.MEDIA_PATH + channelGrid.file
      }

      const timeDiff = diffTime(channelGrid.startTime, getDateTime())

      if (media) {
        this.device.play(media, { startTime: timeToSeconds(timeDiff) }, function (err) {
          if (!err) console.log('Playing in your chromecast')
          console.log("err", err)
        })
      }
      if (this.device && this.device.getStatus) {
        // device.getStatus((a)=>{
        //   console.log("===",a)
        // })
      }
      return true
    }
  }

  async getChannelGrid(channel) {
    if (!channel) {
      console.log('no channel provided')
      return false;
    }
    const { data, error } = await this.connection
    .from('scheduleGrid')
    .select(`
      *,
      channels(channelName)
    `)
    .eq('channels.channelName', channel)
    .lt('startTime', getDateTime())
    .gt('endTime', getDateTime())
    console.log(data)
    if (error){
      console.log("getChannelGrid Error: ", error)
      return false
    } else {
      return data[0];
    }
  }

  startGrid() {
    // procurar no db por programacao com channel igual o nome do chromecast
  }
}