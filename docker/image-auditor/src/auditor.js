/**
 * auditor application for orchestra lab
 * @authors Corentin Zeller & Thaillades Laurent
 * @date 27 june 2021
 * just like the thermometer example + tcp part
 */

const dgram = require("dgram");
const moment = require("moment");
const socket = dgram.createSocket("udp4");
const net = require("net");
const protocol = require("./protocol");

const soundToInstrumentMap = new Map([
  ["ti-ta-ti", "piano"],
  ["pouet", "trumpet"],
  ["trulu", "flute"],
  ["gzi-gzi", "violin"],
  ["boum-boum", "drum"],
]);

const currentMusicians = new Map();
setInterval(() => {
  // remove inactive musicians every seconds
  currentMoment = moment();
  currentMusicians.forEach((intrument, uuid) => {
    if (currentMoment.diff(moment(intrument.lastHeard), "s") > 5) {
      currentMusicians.delete(uuid);
    }
  });
}, 1000);

//  ***************************************
//  ******* partie udp  *******************
//  ***************************************

// just like thermo. example
socket.bind(protocol.PROTOCOL_PORT_UDP, function () {
  socket.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

socket.on("message", (msg) => {
  // received sound
  const musician = JSON.parse(msg);
  if (currentMusicians.has(musician.uuid)) {
    // just update last heard in this case
    currentMusicians.get(musician.uuid).lastHeard = moment();
  } else {
    // create it because first time
    currentMusicians.set(musician.uuid, {
      uuid: musician.uuid,
      instrument: soundToInstrumentMap.get(musician.sound),
      lastHeard: moment(),
      activeSince: moment(),
    });
  }
});

//  ***************************************
//  ******* partie TCP  *******************
//  ***************************************
const srv = net.createServer();
srv.listen(protocol.PROTOCOL_PORT_TCP);
srv.on("connection", (s) => {
  let data = [];

  currentMusicians.forEach((instrument, uuid) => {
    data.push({
      uuid: uuid,
      instrument: instrument.instrument,
      activeSince: instrument.activeSince,
    });
  });
  s.write(JSON.stringify(data));
  s.end();
});
