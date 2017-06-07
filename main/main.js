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
        var buf = new Buffer(req.query + '\n');
        sp.write(buf);
    });
    sp.on('data', (data) => {
        dataReceived += "\n" + data;
        console.log('data received: ' + data);
    });

    res.send(dataReceived);
    //res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});


