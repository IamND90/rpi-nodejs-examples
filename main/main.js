"use-strict";

var express = require('express');  //web server
let app = express();
var SerialPort = require("serialport");

var dataReceived = "";

app.get('/', function (req, res) {
    console.log('Request Params',req.params);
    console.log('Request Query',req.query);
    res.send('Hello World!\n' + dataReceived)
});

app.listen(8080, function () {
    console.log('Example app listening on port 3000!')
});


var sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
sp.on("open", function () {
    console.log('open');
    var buf = new Buffer(1); //creates a new 1-byte buffer
    buf.writeUInt8(1, 0); //writes the pwm value to the buffer
    sp.write(buf);
});
sp.on('data', function(data) {
    dataReceived += "\n" + data;
    console.log('data received: ' + data);
});


//SERVER





