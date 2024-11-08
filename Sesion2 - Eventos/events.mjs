import { EventEmitter } from 'node:events'

const emisorEventos = new EventEmitter()

let variable = 'Un texto gigante ...'

const listenerMuchaAgua = () => {
  console.log(`Tienes que regar las plantas 🌱`)
}
// emisorEventos.on
// para escuchar eventos
// emisorEventos.on('mucha_agua', listenerMuchaAgua)
emisorEventos.once('mucha_agua', listenerMuchaAgua)

// Enviar eventos al sistema
emisorEventos.emit('mucha_agua')

emisorEventos.removeListener('mucha_agua', listenerMuchaAgua)
