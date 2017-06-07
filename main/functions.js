/**
 * Created by andreyparamonov on 07.06.17.
 */
//import sp from './main.js';

let sp = null;

function showValue(value) {

    let buf = 'A4='+value + '\n';
    console.log('Value', buf);
    let a = document.getElementById('send'); //or grab it by tagname etc
    a.href = '#'+buf;
}

function confirmValue() {

}

