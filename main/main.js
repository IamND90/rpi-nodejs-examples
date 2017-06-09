'use-strict';

const express = require('express');  //web server
const events = require('events');
const SerialPort = require("serialport");
const bodyParser = require('body-parser')

const dispatcher = new events.EventEmitter();
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let sp = null;

let dataReceived = [];

function initSp() {
    if( sp === null ){
        sp = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });
        console.log('Serial Port start!');

        sp.on("open", () => {
            console.log('open');
            sp.write('pins\n');
        });

        sp.on('data', (data) => {
            dataReceived.push(data);
            dispatcher.emit('message', data);
            console.log('Data received: ' + data);
        });
    }
}

function sendSp(data, callback) {
    if( sp === null ){
        initSp();
    }
    sp.on('data',callback);
    sp.write(new Buffer(data + "\n"), function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
}

app.get('/', (req, res) => {

    console.log('Get /', req.query);
    if ( sp !== null) {
        let keys = Object.keys(req.query);
        if ( keys.length >0){
            let toSend = '';
            for ( let key of keys) {
                if( toSend !== '') toSend += ' ';
                toSend += key;
                if( req.query[key] && req.query[key] !== ''){
                    toSend += '=' +  req.query[key];
                }
            }
            sendSp(toSend, (data) => {
                console.log('Data: ' + data);
                res.send(data);
            });
        } else {
            res.render('index', {
                posts: dataReceived,
            });
        }
    }
    else {
        res.render('index', {
            posts: dataReceived,
        });
    }


});

app.get('/subscribe', (req, res) => {
    res.set('Content-Type', 'application/json');
    dispatcher.once('message', message => {
        const msg = message.toString();
        console.log('Emit:',msg);
        res.json(msg);
    });
    initSp();
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
