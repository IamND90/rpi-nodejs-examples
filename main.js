let app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);
let SerialPort = require("serialport").SerialPort

let sp = new SerialPort("/dev/tty-usbserial1");
var portName = '/dev/ttyACM0';

sp.on("open", function () {
    sp.write(0x80);
    sp.write('123456\r');
    console.log ("comm port ready");
});

sp.open(portName, { // portName is instatiated to be COM3, replace as necessary
    baudRate: 115200, // this is synced to what was set for the Arduino Code
    dataBits: 8, // this is the default for Arduino serial communication
    parity: 'none', // this is the default for Arduino serial communication
    stopBits: 1, // this is the default for Arduino serial communication
    flowControl: false // this is the default for Arduino serial communication
});

//SERVER
server.listen(80, '127.0.0.5');

app.get('/', function (req, res){
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket){
    socket.emit('test', { test: 'Its Working' });
    socket.on('value', function (data){
        console.log(data);
    });
});