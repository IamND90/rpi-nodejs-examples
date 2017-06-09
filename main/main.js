'use-strict';

let express = require('express');  //web server
let SerialPort = require("serialport");

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


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
            //var node = document.createTextNode(data);         // Create a text node
            //window.document.getElementById('input').appendChild(node);
            console.log('data received: ' + data);
        });
    }
}

function sendSp(data) {
    if( sp === null ){
        initSp();
    }
    sp.write(new Buffer(data + "\n"), function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
}

app.get('/', (req, res) => {
    initSp();
    console.log('Get /', req.query);
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
        sendSp(toSend);
    }


    res.render('index', {
        posts: dataReceived,
    });
});


app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});
