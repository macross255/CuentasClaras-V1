const fs = require('fs');
const readline = require('readline');

const inputFile = readline.createInterface({
    input: fs.createReadStream('./GastosViaje/gastos.txt') //ruta de acceso del archivo donde se va a leer el archivo

});
//readline me permite manipular el input dentro de la consola de NodeJs
module.exports = inputFile;

//stdin (otra propuesta)

//stdout