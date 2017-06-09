

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
    for( let key in keys){
        conf[key] = json[key];

        let p = document.getElementById(key);
        if( p && p!==null) {
            p.innerHTML = conf[key];
        }

    }


    let elemDiv = document.createElement('p');
    elemDiv.innerHTML = json;
    document.body.appendChild(elemDiv);

}

poll();
