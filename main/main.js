"use-strict";

let express = require('express');  //web server
let app = express();
let router = express.Router();

let SerialPort = require("serialport");
let path = require('path');

let dataReceived = "";
let sp = null;

function initSp() {
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
}

app.use(router);
app.use(express.static('public'));

router.all('/', function (req, res, next) {
    console.log('Request!', req);
    initSp();
    next();
});

router.get('/', function (req, res) {
    console.log('Index!', req);
    initSp();
    res.render('index');
});


app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
});


//export { sp }