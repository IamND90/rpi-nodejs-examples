"use-strict";

var express = require('express');  //web server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);	//web socket server
var SerialPort = require("serialport");

server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages


var sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
sp.on("open", function () {
    console.log('open');
    var buf = new Buffer(1); //creates a new 1-byte buffer
    buf.writeUInt8(1, 0); //writes the pwm value to the buffer
    sp.write(buf);
});
sp.on('data', function(data) {
    console.log('data received: ' + data);
});

io.sockets.on('connection', function (socket){
    socket.emit('test', { test: 'Its Working' });
    socket.on('value', function (data){
        console.log(data);
    });
});


/*
sp.open(portName, { // portName is instatiated to be COM3, replace as necessary
    baudRate: 115200, // this is synced to what was set for the Arduino Code
    dataBits: 8, // this is the default for Arduino serial communication
    parity: 'none', // this is the default for Arduino serial communication
    stopBits: 1, // this is the default for Arduino serial communication
    flowControl: false // this is the default for Arduino serial communication
}).catch((error) => {
    console.log(error);
});
*/

//SERVER





