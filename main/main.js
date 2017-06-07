"use-strict";

let express = require('express');  //web server
let app = express();
let SerialPort = require("serialport");
let path = require('path');

let sp = null;

let dataReceived = [];

function initSp() {
    if( sp === null ){
        sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
        console.log('Serial Port start!');
        sp.on("open", () => {
            console.log('open');
            sp.write('pins');
        });
        sp.on('data', (data) => {
            dataReceived.push(data);
            console.log('data received: ' + data);
        });
    }
}

app.get('/', (req, res) => {

    initSp();
    console.log('Get /');
    res.render('../public/index');
});

app.get('/test', (req, res) => {

    initSp();
    console.log('Get /test');
    res.send('Hello');
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});


//export { sp }