const { v4: uuidv4 } = require("uuid");
const dgram = require("dgram");

const uuid = uuidv4();

const sendInterval = 1000;
const portAuditor = 2205;

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

const dgramSocket = dgram.createSocket("udp4");

function sendSoundToAuditorCallback() {
  console.log("[" + uuid + "] plays " + currentSound);
  const msg = JSON.stringify({
    instrument: type,
    sound: sound,
    uuid: uuid,
  });
  dgramSocket.send(msg, 0, msg.length, PORT, MULTICAST_ADDR);
}

setInterval(sendSoundToAuditorCallback, sendInterval);
