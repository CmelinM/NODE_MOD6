/**
 * La clase encargada de mantener la humedad de un macetero
 */

class Riego {
  constructor(macetero) {
    this.macetero = macetero
  }

  regar() {
    this.macetero.humedad += Math.random() * 0.3

    console.log(`Aumentando - Ahora la humedad del macetero es: ${this.macetero.humedad}`)
  }
}

export { Riego }