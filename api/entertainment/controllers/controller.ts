import IEletronics from '../model/eletronics'
import gpio from 'rpi-gpio'
import shelljs from 'shelljs';
import Client from '../../../clients/chromecast/client'
import MediaServer from '.././mediaServer'
import { getDateTime,
  diffTime,
  timeToSeconds,
  isUrl,
  getDay
} from '../../utils'
import http from 'http';
import fs from 'fs';

// class Controller implements IEletronics {
class Controller {
  id?: string;
  GPIO: number;
  frequency: string;
  potentiometer: string;
  radio: boolean;
  switch: boolean
  voltage: string;
  watts: string;
  collection = 'eletronics'

  client: any;
  device: any = {};
  connection: any;
  mediaServer: any;

  protected database: any;
  protected ISnapshot: any;

  constructor(database: any) {
    this.client = new Client()
    this.connect(database)
    // this.mediaServer = new MediaServer()
    // this.mediaServer.start();
  }

  private async connect(database) {
    await database.connect()
    this.connection = database.connection
    this.onDevice()
  }

  private async serverRestart() {
    shelljs.exec(`pm2 restart rasp`, { async: true, silent: false });
  }

  async onDevice() {
    this.client.on('device', (device) => {
      if (!this.device[device.friendlyName]) {
        this.device[device.friendlyName] = device
        this.startGrid()
      }
    })
    this.client.on('status', ({ status, device }) => {
      this.device[device.friendlyName].status = status
      if (status.media && Object.keys(status.media).length) {
        this.device[device.friendlyName].media = status.media
      }
    })
  }

  getDeviceContent(deviceName){
    if (!deviceName || !Object.keys(this.device[deviceName]).length) {
      console.log('no device found or provided')
      return null;
    }
    let deviceMedia = this.device[deviceName].media

    if (!deviceMedia) {
      console.log('no media found on device: ', deviceName)
      return null;
    }

    return deviceMedia
  }

  stopMedia(device) {
    device.stop()
  }

  async playMedia({ scheduleGrid = {}, channel = {}, device = null }:any = {}) {
    let media;
    if (!scheduleGrid) {
      console.log('no scheduleGrid provided')
    }
    if (!channel) {
      console.log('no channel provided')
    }

    if (scheduleGrid.file) {
      media = scheduleGrid.file;
      
      if (!isUrl(media)) {
        media = `${process.env.SERVER_IP}:${process.env.MEDIA_PORT}/${process.env.MEDIA_ENDPOINT}/${media}`
        // media = `http://192.168.100.24:${process.env.MEDIA_PORT}/${media}`
      }
    }

    const timeDiff = diffTime(scheduleGrid.startTime, getDateTime())

    if (media) {
      try {
        device.play(media, { startTime: timeToSeconds(timeDiff) }, function (err) {
          if (err) {
            console.log("err", err)
          }
          console.log('Playing in your chromecast')
        })
      } catch (error) {
        console.log("RASP: ", error);
        this.serverRestart()
      }
    }
    return true
  }

  async getChannel(channel) {
    return {
      id: 1,
      name: 'Globo',
      channel: 36,
      channelName: 'channel36'
    }
    if (!channel) {
      console.log('no channel provided')
      return false;
    }

    const { data, error: channelError } = await this.connection
      .from('channels')
      .select()
      .eq('channelName', 'channel36')
      // .eq('channelName', channel)
      .limit(1)
      .single()

    if (channelError) {
      console.log("channel not found")
      return false;
    }

    return data
  }

  async getScheduleGrid(channelId) {
    if (!channelId) {
      console.log('no channelId provided')
      return false;
    }

    const { data: scheduleGrid, error } = await this.connection
      .from('scheduleGrid')
      .select()
      .match({
        channel: channelId,
        days: getDay()
      })

    if (error) {
      console.log("getChannelGrid Error: ", error)
      return false
    } else {
      return scheduleGrid;
    }
  }

  getScheduledMedia(scheduleGrid){
    return scheduleGrid.find(currentMedia => {
      if (!currentMedia.startTime || !currentMedia.endTime) return false;

      const startTimeSplit = currentMedia.startTime.split(":");
      const endTimeSplit = currentMedia.endTime.split(":");
      let currentTime: any = new Date();
      let startTime: any = new Date().setHours(startTimeSplit[0],startTimeSplit[1],startTimeSplit[2]);
      let endTime: any = new Date().setHours(endTimeSplit[0],endTimeSplit[1],endTimeSplit[2]);
      const shouldHaveStarted = currentTime > new Date(startTime);
      const shouldHaveEnded = currentTime > new Date(endTime);

      return shouldHaveStarted && !shouldHaveEnded;
    })
  }

  startGrid() {
    setInterval(async () => {
      Object.keys(this.device).forEach(async (key, index) => {
        const device = this.device[key];
        let channel:any = {};
        let scheduleGrid:any = {};
        let contentName = null;

        scheduleGrid = await this.getGridFromJson(device);
        if (!scheduleGrid) {
          return false;
        }
        scheduleGrid = this.getScheduledMedia(scheduleGrid);
        if (!scheduleGrid) {
          console.log("No media to stream right now...")
          return false;
        };

        const content = this.getDeviceContent(device.friendlyName) || {}

        if (content.contentId) {
          contentName = this.getContentFromUrl(content)
        }

        console.log('\nfile ', scheduleGrid.file)
        console.log('content ', content)
        console.log('contentName ', contentName)
        console.log('SHOULD CHANGE: ', !!scheduleGrid.file && (!contentName || scheduleGrid.file !== contentName))
        console.log('\n')

        if (
          !!scheduleGrid.file &&
          (!contentName || scheduleGrid.file !== contentName)
        ) {
          this.playMedia({
            device,
            channel,
            scheduleGrid
          })
        } else if (!scheduleGrid.file && Object.keys(content).length) {
          this.stopMedia(device)
        }

      });
    }, 5000)
  }

  getContentFromUrl(content) {
    if (content.contentType === 'x-youtube/video') {
      return `https://www.youtube.com/watch?v=${content.contentId}`;
    } else {
      let url = new URL(content.contentId);
      if (url.pathname) {
        let splitedUrl = url.pathname.split('/')
        return splitedUrl[splitedUrl.length - 1]
      }
      
      return ''
    }
  }

  async getGridFromJson(device) {
    let rawFile: any;
    let scheduleGrid: any;
    try {
      rawFile = fs.readFileSync(device.friendlyName + '_grid.json');
      scheduleGrid = rawFile ? JSON.parse(rawFile) : null;
    } catch (error) {
      console.log("getGridFromJson", error)
    }
    const currentDay = getDay();

    if (!scheduleGrid || scheduleGrid[0]?.day != currentDay) {
      await this.updateGridFromJson(device)
      return null;
    } else {
      return scheduleGrid;
    }
  } 

  async updateGridFromJson(device) {
    console.log(`Updating grid for ${device.friendlyName}`);

    let channel:any = await this.getChannel(device.friendlyName)
    console.log("->", channel)
    const scheduleGrid = await this.getScheduleGrid(channel.id)
    const dateTime = {
      "day": getDay()
    };
    scheduleGrid.unshift(dateTime);
    const data = JSON.stringify(scheduleGrid);
    fs.writeFile(device.friendlyName + '_grid.json', data, {}, (error)=>{
      if (error) console.log("updateGridFromJson error: ", error)
    });
  }

  public getShow(req: any, res: any): void {
    const { showName } = req.params

    let filePath;

    if (showName) {
      filePath = process.env.MEDIA_PATH + showName
    }
    
    try {
      const stat = fs.statSync(filePath);
      const total = stat.size;
      if (req.headers['range']) {
        const range = req.headers.range;
        const parts = range.replace(/bytes=/, "").split("-");
        const partialstart = parts[0];
        const partialend = parts[1];

        const start = parseInt(partialstart, 10);
        const end = partialend ? parseInt(partialend, 10) : total - 1;
        const chunksize = (end - start) + 1;

        const file = fs.createReadStream(filePath, { start: start });
        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
        });
        file.pipe(res);
      } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      console.log('error trying to start the server', error)
    }
  }
}

export default Controller