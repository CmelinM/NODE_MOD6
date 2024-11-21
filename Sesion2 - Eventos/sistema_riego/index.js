// Articula la ejecución de la app
import { Macetero } from "./Macetero.js";
import { Riego } from "./Riego.js";
import { Sensor } from "./SensorHumedad.js";

let palto = new Macetero()

let sistemaRiego = new Riego(palto)
let sensor = new Sensor(palto)

sensor.on('muy_humedo', () => {console.log('Dentengan todo, la planta se ahoga')})
sensor.on('poca_humedad', () => { sistemaRiego.regar() })

// Se inician los modelos después de tener registrados los listeners
sensor.encender()
palto.iniciarModelo()