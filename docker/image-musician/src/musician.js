/**
 * musician application for orchestra lab
 * @authors Corentin Zeller Thaillades Laurent
 * @date 27 june 2021
 * just like the thermometer example
 */

const dgram = require('dgram');
const { v4: uuidv4 } = require('uuid');
const PROTOCOL = require('./protocol');

const instrumentsSounds = {
    piano : "ti-ta-ti",
    trumpet : "pouet",
    flute : "trulu",
    violin : "gzi-gzi",
    drum : "boum-boum"
}

function Musician(instrument) {
    this.uuid = v4();
    this.instrument = instrument;
    this.sound = instrumentsSounds[instrument];

    Musician.prototype.update = function () {
        const data = {
            uuid: this.uuid,
            sound: this.sound,
        };
        const payload = JSON.stringify(data);
        const msg = new Buffer.from(payload);
        socket.send(msg, 0, msg.length, protocol.PROTOCOL_PORT, protocol.PROTOCOL_MULTICAST_ADDRESS,
            function (err, bytes) {
                console.log("Sending payload: " + payload + " via port " + socket.address().port);
            }
        );
    }
    setInterval(this.update.bind(this), 1000);
}

const m = new Musician(process.argv[2]);