/**
 * Created by andreyparamonov on 07.06.17.
 */
import sp from './main.js';

function showValue(value) {
    console.log('Value', value);
    var buf = new Buffer('A4='+value + '\n');
    sp.write(buf);
}