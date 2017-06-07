/**
 * Created by andreyparamonov on 07.06.17.
 */



function showValue(value) {
    let buf = 'A4='+value + '\n';
    console.log('Value', buf);
    let a = document.getElementById('send'); //or grab it by tagname etc
    a.href = '#'+buf;

    if( sp == null ) initSp();
    if( sp!== null ){
        console.log('Send:', buf);
        sp.write(buf);
    }
}


