"use-strict";

let express = require('express');  //web server
let SerialPort = require("serialport");
let path = require('path');

let app = express();
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);



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

function sendSp(data) {
    if( sp === null ){
        initSp();
    }
    console.log('Send:', data);
    sp.write(new Buffer(data + "\n"), function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
}

app.get('/', (req, res) => {

    //initSp();
    console.log('Get /', req.query);
    let keys = Object.keys(req.query);
    if ( keys.length >0){
        let toSend = '';
        for ( let key in keys) {
            if( toSend !== '') toSend += ' ';
            toSend += key;
            if( req.query[key] && req.query[key] !== ''){
                toSend += '=' +  req.query[key];
            }
        }
        sendSp(toSend);
    }


    res.render('index.html');
});

app.use(express.static('public'));

app.get('/test', (req, res) => {

    //initSp();
    console.log('Get /test');
    res.send('Hello');
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});


//export { sp }