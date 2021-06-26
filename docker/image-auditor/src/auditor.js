const protocol = require("./protocol");
const dgram = require("dgram");
const moment = require("moment");

/**
 * current musicians
 */
//TODO: https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
let musicians = [];

/**
 * remove inactive musicians from list (didnt emit since 5seconds) and run it every seconds
 */
function removeInactivesMusicians() {
  actualTime = moment();
  musicians = musicians.filter(
    (x) => actualTime.diff(x.timestamp, "seconds") < 5
  );
}
setInterval(removeInactivesMusicians, 1000);

/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
 */
const s = dgram.createSocket("udp4");

/**
 * bind to port and address for udp side
 */
s.bind(protocol.PROTOCOL_PORT, function () {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/*
 * This call back is invoked when a new datagram has arrived.
 */
s.on("message", function (msg, source) {
  console.log("Data has arrived: " + msg + ". Source port: " + source.port);
  msg_parsed = msg.toString().split(" ");
  if (msg_parsed.length === 2) {
    let found = false;
    musicians.forEach((musician) => {
      if (musician.uuid === msg_parsed[1]) {
        musician.lastActive = Date.now();
        found = true;
        return;
      }
    });
    if (!found) {
      const new_musician = {
        uuid: msg_parsed[1],
        instrument: soundMap[msg_parsed[0]],
        activeSince: Date.now(),
        lastActive: Date.now(),
      };
      musicians.push(new_musician);
    }
  }
});

// TCP Listening Server
var server = net.createServer(function (socket) {
  socket.write(
    JSON.stringify(
      musicians.map((musician) => {
        return {
          uuid: musician.uuid,
          instrument: musician.instrument,
          activeSince: moment(musician.activeSince),
        };
      })
    )
  );
  socket.pipe(socket);
  socket.destroy();
});

server.listen(2205, "0.0.0.0");
