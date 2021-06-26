const { v4: uuidv4 } = require("uuid");

const protocol = require("./protocol");

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require("dgram");

/*
 * Let's create a datagram socket. We will use it to send our UDP datagrams
 */
var s = dgram.createSocket("udp4");

/*
 * Let's define a javascript class for our thermometer. The constructor accepts
 * a location, an initial temperature and the amplitude of temperature variation
 * at every iteration
 */
function Musician(sound) {
  this.uuid = uuidv4();
  this.sound = sound;
  this.active_since = Date.now();

  this.Musician.prototype.update = function () {
    var data = {
      uuid: this.uuid,
      sound: this.sound,
      timestamp: new Date(),
    };
    var payload = JSON.stringify(data);

    message = new Buffer(payload);
    s.send(
      message,
      0,
      message.length,
      protocol.PROTOCOL_PORT,
      protocol.PROTOCOL_MULTICAST_ADDRESS,
      function (err, bytes) {
        console.log(
          "Sending payload: " + payload + " via port " + s.address().port
        );
      }
    );
  };

  /*
   * Let's take and send a measure every 500 ms
   */
  setInterval(this.update.bind(this), 1000);
}

const instrumentSoundMap = new Map();
instrumentSoundMap.set("piano", "ti-ta-ti");
instrumentSoundMap.set("trumpet", "pouet");
instrumentSoundMap.set("flute", "trulu");
instrumentSoundMap.set("violin", "gzi-gzi");
instrumentSoundMap.set("drum", "boum-boum");

const currentInstrument = process.argv[2];

if (!instrumentSoundMap.has(currentInstrument)) {
  console.log("The instrument specified doesn't exist");
  process.exit(1);
}
const currentSound = instrumentSoundMap.get(currentInstrument);

/*
 * Let's create a new thermoter - the regular publication of measures will
 * be initiated within the constructor
 */
var musician = new Musician(currentSound);
