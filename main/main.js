"use-strict";

let express = require('express');  //web server
let app = express();
let SerialPort = require("serialport");
let path = require('path');



let dataReceived = "";
let sp = null;


app.use(express.static('public'));

app.get('/', (req, res) => {

    console.log('Request Query',req.query);

    if( sp === null ){
        sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
        sp.on("open", () => {
            console.log('open');
            var buf = new Buffer(req.query + '\n');
            sp.write(buf);
        });
        sp.on('data', (data) => {
            dataReceived += "\n" + data;
            console.log('data received: ' + data);
        });
    }
    if( req.query && sp!== null ){
        console.log('Send:', req.query);
        let keys = Object.keys(req.query);
        let key = keys[0];
        if( req.query[key] ) key =+ '=' + req.query[key];
        let buf = new Buffer(key+ '\n');
        sp.write(buf);
    }

    res.send(dataReceived);
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});


//export { sp }