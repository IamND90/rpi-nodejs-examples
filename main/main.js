"use-strict";

let express = require('express');  //web server
let app = express();
let SerialPort = require("serialport");
let path = require('path');

let dataReceived = "";

app.get('/', (req, res) => {

    console.log('Request Query',req.query);

    var sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
    sp.on("open", () => {
        console.log('open');
        var buf = new Buffer(1); //creates a new 1-byte buffer
        buf.writeUInt8(1, 0); //writes the pwm value to the buffer
        sp.write(buf);
    });
    sp.on('data', (data) => {
        dataReceived += "\n" + data;
        console.log('data received: ' + data);
    });

    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});


