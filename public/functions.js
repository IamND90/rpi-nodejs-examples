
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
    console.log('Subscribed to events');
    setTimeout( () => {
        window.fetch('http://localhost:8080/subscribe').then((res) => {
            console.log('Event!',res);

            if( res) {
                let keys = Object.keys(res);
                for( let key in keys){
                    conf.key = res[key];
                }
            }

            poll();
        });

    },200);
}

poll();
