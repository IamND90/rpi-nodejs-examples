
let currentValue = 500;

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
                //let jsonData = JSON.parse(data);
                console.log('Data',data);

            if( data) {
                let keys = Object.keys(data);
                for( let key in keys){
                    conf[key] = data[key];
                }
            }

            let elemDiv = document.createElement('p');
            elemDiv.innerHTML = data.toString();
            document.body.appendChild(elemDiv);

            poll();
        });

    },200);
}

poll();
