let videoStitch = require('video-stitch');

let videoConcat = videoStitch.concat;

videoConcat(
//   {
//   ffmpeg_path: ffmpeg
// }
)
  // .original({
  //   "fileName": "teste",
  //   "duration": "00:01:00"
  // })
  .clips([
    {
      "fileName": "teste.mp4",
    },
    {
      "fileName": "teste.mp4",
    },
  ])
  .output("myfilename.mp4")
  .concat()
  .then(name=>{
    console.log(name)
  })
//   .then((outputFile) => {
//     console.log('path to output file', outputFile);
//   });

// import "./config/env"
// import Database from './config/database'
// import server from './server/server'
// import rooms from './api/rooms'
// import eletronics from './api/eletronics'
// import express from "express";
// import morgan from 'morgan'
// import helmet from 'helmet'
// import bodyParser from 'body-parser'
// // import device from './device'

// const ChromecastAPI = require('chromecast-api')
// const client = new ChromecastAPI()

// var http = require('http'),
//     fs = require('fs'),
//     util = require('util');

//     // console.log(device)
// // http.createServer(function (req, res) {
// //   var path = 'manha_2022_11_21.mp4';
// //   // var path = 'teste.mp4';
// //   var stat = fs.statSync(path);
// //   var total = stat.size;
// //   if (req.headers['range']) {
// //     var range = req.headers.range;
// //     var parts = range.replace(/bytes=/, "").split("-");
// //     var partialstart = parts[0];
// //     var partialend = parts[1];

// //     var start = parseInt(partialstart, 10);
// //     var end = partialend ? parseInt(partialend, 10) : total-1;
// //     var chunksize = (end-start)+1;
// //     // console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

// //     var file = fs.createReadStream(path, {start: start, end: end});
// //     res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
// //     file.pipe(res);
// //   } else {
// //     // console.log('ALL: ' + total);
// //     res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
// //     fs.createReadStream(path).pipe(res);
// //   }
// // }).listen(1337, '127.0.0.1');
// // console.log('Server running at http://127.0.0.1:1337/');

// // client.update()rs

// client.on('device', function (device) {
//   console.log("1111111", device)
// //   var mediaURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
  
// //   // var mediaURL = 'https://ff54-2804-d51-4b2c-7c00-308b-6ed7-dd00-c2b6.sa.ngrok.io';
// //   // device.play(mediaURL, {startTime: 16800}, function (err) {
// //   device.play(mediaURL, {startTime: 120}, function (err) {
// //     if (!err) console.log('Playing in your chromecast')
// //     console.log("err", err)
// //   })
// //   if (device && device.getStatus) {
// //     device.getStatus((a)=>{
// //       console.log("===",a)
// //     })

// //   }
// })





// // const database = new Database().connect()
// // const app = express()

// // app.use(morgan('dev'))
// // app.use(helmet())
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // server.start(app, rooms, database, () => { console.log('Started rooms') })
// // server.start(app, eletronics, database, () => { console.log('Started eletronic') })

// // app.listen(process.env.PORT, () => {
// //   console.log('teste funcional, porta: ', process.env.PORT);
  
// // })

// /////////////////////////////////////////


// // var http = require('http'),
// //     fs = require('fs'),
// //     util = require('util');

// // http.createServer(function (req, res) {
// //   var path = 'manha_2022_10_26.mp4';
// //   var stat = fs.statSync(path);
// //   var total = stat.size;
// //   if (req.headers['range']) {
// //     var range = req.headers.range;
// //     var parts = range.replace(/bytes=/, "").split("-");
// //     var partialstart = parts[0];
// //     var partialend = parts[1];

// //     var start = parseInt(partialstart, 10);
// //     var end = partialend ? parseInt(partialend, 10) : total-1;
// //     var chunksize = (end-start)+1;
// //     console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

// //     var file = fs.createReadStream(path, {start: start, end: end});
// //     res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
// //     file.pipe(res);
// //   } else {
// //     console.log('ALL: ' + total);
// //     res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
// //     fs.createReadStream(path).pipe(res);
// //   }
// // }).listen(1337, '127.0.0.1');
// // console.log('Server running at http://127.0.0.1:1337/');