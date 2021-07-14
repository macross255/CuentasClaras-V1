const inputFile = require("./auxiliar-scrip");

const MONTO_MAX = 1000.0;
const DECIMAL = 2;

const file = inputFile;
const balanceViaje = [];
let gastosViaje = [];
let totaldelViaje = 0;

let flag = false;


const setGastosData = (dataFile) => {
  let total = 0;
  let prom = 0;

  dataFile.on("line", (line) => {

    if (line.startsWith("0")) {
      dataFile.close();
      dataFile.removeAllListeners();
      flag = true;
    }

    if (line.startsWith("$")) {
      gastosViaje.push(parseFloat(line.split("$")[1]));
    } else {
      setTotalViaje();
      if (gastosViaje.length) {
        gastosViaje = verifyGastos(gastosViaje);
        total = getTotal(gastosViaje);
        prom = getProm(gastosViaje, total);
        calcBalance(gastosViaje, prom);
        muestraBalace();
        resetGastosViaje();
      }
    }
  });
};

const resetGastosViaje = () => {

  gastosViaje = [];
};

const setTotalViaje = () => {

  !flag ? totaldelViaje++ : totaldelViaje;
};

const verifyGastos = (gastos) => {

  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i] > MONTO_MAX) {
      gastos[i] = MONTO_MAX;
    }
  }
  return gastos;
};

const getTotal = (gastos) => {

  return gastos.reduce(
    (gastosAcumulados, gastos) => gastosAcumulados + gastos,
    0
  );
};

const getProm = (gastos) => {

  const prom =
    gastos.reduce((total, gastos) => total + gastos, 0) / gastos.length;
  return prom.toString().substring(0, getNumOfDecimal(prom));
};

const calcBalance = (gastos, prom) => {

  let total = 0;
  gastos.forEach((gasto) => {
    if (gasto < prom) {
      total += prom - gasto;
    }
  });


  balanceViaje.push(total.toFixed(DECIMAL));
};

const getNumOfDecimal = (num) => {
  const array = num.toString().split(".");

  switch (
  array[0].length
  ) {
    case 1:
      return 4;
    case 2:
      return 5;
  }
};

const muestraBalace = () => {

  if (balanceViaje.length === totaldelViaje) {
    balanceViaje.forEach((balance) => console.log(`$${balance}`));
  }
};

setGastosData(file);

module.exports = {
  verifyGastos,
  getProm,
  balanceViaje,
  calcBalance,
};
