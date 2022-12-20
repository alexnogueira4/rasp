const mdns = require('mdns');
const Client = require('castv2-client').Client;
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
const browser = mdns.createBrowser(mdns.tcp('googlecast'));
var mdns2 = require('multicast-dns')()
const cli = require('./clients/chromecast/client')

mdns2.on('response', function(response) {
  console.log('got a response packet:', response)
})

mdns2.on('query', function(query) {
  // console.log('got a query packet:', query)
})

const tentarDenovo = (host, client) => {
  console.log('tentando de novo.......')
  try {
    playMedia(host)
    return true
  } catch (error) {
    console.log('vish maria', error)
    return tentarDenovo(host, client)
  }
} 
const playMedia = host => {
  const client = new Client();
  console.log('playMedia')
  client.connect(host, () => {
    console.log('connected' );
    client.on('error', (err) => {
      console.log('deu timeout!!!!')
      console.log('Error2: %s', err)
      tentarDenovo(host, client)
      client.close()
    })
    client.on('timeout', () => {
    })
    client.launch(DefaultMediaReceiver, (err, player) => {
      const media = {
        contentId: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
        contentType: 'video/mp4',
        streamType: 'BUFFERED',
        metadata: {
          type: 0,
          metadata: 0,
          title: 'teste',
          images: [
            { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg' }
          ]
        }
      };

      player.on('status', status => {
        console.log('status', status.playerState);
      })

      player.load(media, { autoplay: true }, (err, status) => {
        console.log('playing', status.playerState)
        // setTimeout(() => {
        //   player.seek(2*60, (err, status) => {
        //     console.log('andou', status)
        //   })
        // }, 10000)
      })
    });
  });

  client.on('error', (aaa) => {
    console.log('errou: ', aaa)
  })
};

browser.on('serviceUp', service => {
  const { md, fn } = service.txtRecord;
  console.log("serviceUp", md, fn)
  // playMedia(service.addresses[0]);
});

browser.on('error', service => {
  console.log('090909', service)
})

browser.on('serviceDown', service => {
  console.log('caiu => ', service)
});

browser.on('serviceChanged', (aa, bb) =>{
  console.log("serviceChanged", aa)
  console.log('----')
  console.log("serviceChanged", bb)
})
browser.start(aa=>{
  console.log('comeco', aa)
});
console.log(browser)


export default {}