const protocol = require("./protocol");
const dgram = require("dgram");

/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
 */
const s = dgram.createSocket("udp4");
s.bind(protocol.PROTOCOL_PORT, function () {
  console.log("Joining multicast group");
  s.addMembership(protocol.PROTOCOL_MULTICAST_ADDRESS);
});

/*
 * This call back is invoked when a new datagram has arrived.
 */
s.on("message", function (msg, source) {
  console.log("Data has arrived: " + msg + ". Source port: " + source.port);
});
