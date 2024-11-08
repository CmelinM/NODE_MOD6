class Macetero {
  constructor() {
    this.planta = 'Palto'
    this.sustrato = 'sustrato'
    this.humedad = 0.25
    this.intervaloId = null
  }

  /**
   * Definir alguna forma de modelar
   * la disminución de la humedad a través del
   * tiempo
   */

  iniciarModelo() {
    console.log(`Modelo iniciado`)
    clearInterval(this.intervaloId)

    let intervalo = setInterval(() => {
      this.humedad -= Math.random() * 0.1
      console.log(`Disminuyendo - Humedad actual: ${this.humedad}`)
    }, 3000)

    this.intervaloId = intervalo
  }

  detenerModelo() {
    clearInterval(this.intervaloId)
  }
}

export { Macetero }