

let conf = {
    name: 'Unknown',
    pins: {
        A0: 0,
        A1: 1,
    }

};

function showValue(value) {
    let buf = 'A4='+value + '\n';
    console.log('Value', buf);
    let a = document.getElementById('send'); //or grab it by tagname etc
    a.href = '?'+buf;
    a.innerHTML = buf;
}

function getPins() {
    setTimeout( () => {
        window.fetch(document.baseURI + '/send/?pins')
            .then((res) => {
                return res.json();
            }).then((data) => {

            let json =  JSON.parse(data);
            console.log('Json:',json);
            updateDom(json);
        });
    },0);
}

function poll(){
    console.log('Subscribed to events',document.baseURI);
    setTimeout( () => {
        window.fetch(document.baseURI + 'subscribe')
            .then((res) => {
                return res.json();
            }).then((data) => {

                let json =  JSON.parse(data);
                console.log('Json:',json);
                updateDom(json);

                poll();

        });

    },0);
}

function updateDom(json) {
    let keys = Object.keys(json);
    let container = document.getElementsByClassName('container');

    for( let key of keys){
        conf[key] = json[key];

        let p = document.getElementById(key);
        if( p && p!==null) {
            p.innerHTML = conf[key];
        }
        else {

            let div = document.createElement('div');
            let p = document.createElement('p');
            p.innerHTML = key;
            div.appendChild(p);
            let n = document.createElement('p');
            n.innerHTML = conf[key];

            document.body.appendChild(div);
        }

    }


}

poll();
