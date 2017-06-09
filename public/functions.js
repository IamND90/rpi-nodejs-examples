
let currentValue = 500;

function showValue(value) {
    let buf = 'A4='+value + '\n';
    console.log('Value', buf);
    let a = document.getElementById('send'); //or grab it by tagname etc
    a.href = '?'+buf;
    a.innerHTML = buf;
}

function getCurrentA0(){
    return currentValue;
}

() => {
    document.getElementById('send').addEventListener('click', () => {
        console.log('Send click');
        let text = document.getElementById('input').textContent;
        sendSp(text);
    });


}