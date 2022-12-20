import http from 'http';
import fs from 'fs';
// import util from 'util';

export default class MediaServer {
  server: any;
  filePath: string; 
  constructor(options){

    // this.filePath = options.filePath || 'manha_2022_11_21.mp4';
    this.filePath = 'medias/manha_2022_11_21.mp4';
    this.server = http;
  }
  
  
  createServer(req, res) {
    const stat = fs.statSync(this.filePath);
    const total = stat.size;
    if (req.headers['range']) {
      const range = req.headers.range;
      const parts = range.replace(/bytes=/, "").split("-");
      const partialstart = parts[0];
      const partialend = parts[1];
  
      const start = parseInt(partialstart, 10);
      const end = partialend ? parseInt(partialend, 10) : total - 1;
      const chunksize = (end - start) + 1;
      // console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);
  
      const file = fs.createReadStream(this.filePath, { start: start, end: end });
      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      });
      file.pipe(res);
    } else {
      // console.log('ALL: ' + total);
      res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
      fs.createReadStream(this.filePath).pipe(res);
    }
  }
  start () {
    this.server
      .createServer(this.createServer.bind(this))
      .listen(process.env.MEDIA_PORT, '127.0.0.1')
    console.log(`Server running at http://127.0.0.1:${process.env.MEDIA_PORT}`)
  }

}

// http.createServer(function (req, res) {
//   let filePath = 'manha_2022_11_21.mp4';

//   const stat = fs.statSync(filePath);
//   let total = stat.size;
//   if (req.headers['range']) {
//     const range = req.headers.range;
//     const parts = range.replace(/bytes=/, "").split("-");
//     const partialstart = parts[0];
//     const partialend = parts[1];

//     const start = parseInt(partialstart, 10);
//     const end = partialend ? parseInt(partialend, 10) : total - 1;
//     const chunksize = (end - start) + 1;
//     // console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

//     const file = fs.createReadStream(filePath, { start: start, end: end });
//     res.writeHead(206, {
//       'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'video/mp4'
//     });
//     file.pipe(res);
//   } else {
//     // console.log('ALL: ' + total);
//     res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
//     fs.createReadStream(filePath).pipe(res);
//   }
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');