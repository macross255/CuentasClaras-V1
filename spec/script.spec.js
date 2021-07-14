const cuentasApp = require("../src/script");

describe("Tests unitario TinkinBand...:", () => {
  let gastos;
  let promedio;

  beforeEach(() => {
    gastos = [48.14, 587.99, 254.55];
    promedio = 249;
  });

  it("controla bien tus gastos que no superen los $1000.00", () => {
    const gastos = [48.14, 587.99, 1250.0, 1300.1];
    const expectedGasto = [48.14, 587.99, 1000.0, 1000.0];
    const gastoActual = cuentasApp.verifyGastos(gastos);
    expect(gastoActual).toEqual(expectedGasto);
  });

  it("tiene que devolver un promedio mayor, o igual a cero ", () => {
    const promedioActual = cuentasApp.getProm(gastos);
    expect(promedioActual).toBeGreaterThanOrEqual(0);
  });

  it("debe tener una longitud mayor que cero al calcular el saldo total por viaje", () => {
    cuentasApp.calcBalance(gastos, promedio);
    expect(cuentasApp.balanceViaje.length).toBeGreaterThan(0);
  });
});
