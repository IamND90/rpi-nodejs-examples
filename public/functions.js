

let conf = {
    name: 'Unknown',
    pins: {
        A0: 0,
        A1: 1,
    }

};

function showValue(value) {
    let buf = 'A4='+value + '\n';
    let a = document.getElementById('outputText'); //or grab it by tagname etc
    a.innerHTML = buf;
}

function getPins() {
    setTimeout( () => {
        window.fetch(document.baseURI + 'send/?pins')
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
                console.log('Json:',data);
                let json =  JSON.parse(data);

                updateDom(json);

                poll();

        });

    },0);
}

function setElement(div,keys,json){


    for( let key of keys){
        let value = json[key];
        let p = document.getElementById(key);
        let inner ;

        if( !p || p===null) {
            p = document.createElement('div');
            div.appendChild(p);
        }
        p.innerHTML = key;

        if ( value.type === 'string' || value.type === 'integer' ){
            inner = document.createElement('p');
            inner.innerHTML = value;
        }
        else {

            let n = document.createElement('div');
            setElement()
        }

    }


    p.innerHTML = key;
    div.appendChild(p);
}

function setPins(pins){

    let keys = Object.keys(pins);
    const container =  document.getElementById('pins');
    container.innerHTML = '';
    for( let key of keys){
        let value = pins[key];
        let div = document.createElement('div');

        let p = document.createElement('p');
        p.innerHTML = key;
        let t = document.createElement('p');
        t.innerHTML = value;

        div.appendChild(p);
        div.appendChild(t);
        container.appendChild(div);

    }
}
function updateDom(json) {
    let keys = Object.keys(json);

    for( let key of keys){
        if(key === 'pins'){
            setPins(json[key]);
        }
        else {
            let el = document.getElementById(key);
            if( el) el.innerHTML = json[key];
        }
    }

}

poll();
