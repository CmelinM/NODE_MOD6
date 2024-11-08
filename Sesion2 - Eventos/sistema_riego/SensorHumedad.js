/**
 * La clase Sensor
 * crea instancias observables al extender EventEmitter
 */

import { EventEmitter } from 'node:events'

const HUMEDAD_IDEAL = 0.55

class Sensor extends EventEmitter {
  constructor(macetero) {
    super()
    this.macetero = macetero
    this.intervaloId = null
  }

  encender () {
    console.log('Sensor encendido')
    clearInterval(this.intervaloId)

    let intervalo = setInterval(() => {
      if(HUMEDAD_IDEAL <= this.macetero.humedad) {
        this.emit('muy_humedo')
      } else if (HUMEDAD_IDEAL > this.macetero.humedad) {
        this.emit('poca_humedad')
      }
    }, 10000)

    this.intervaloId = intervalo
  }
}

export { Sensor }