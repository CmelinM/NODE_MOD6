/**
 * Jest
 * 
 * llaves
 * titulo, anio, canciones, sello, formato
// let llavesPermitidas = [ "titulo", "anio", "canciones", "sello", "formato" ]
 */

import { isValidDisc } from "../../lib/validations.js"

describe('Validador disco beatles', () => {
  test('Deja actualizar o crear discos sólo con las "llaves" correspondientes', () => {
    let disco1 = {
      titulo: "Un gran disco",
      anio: 1985,
      canciones: [ "cancion1", "cancion2" ]
    }

    let disco2 = {
      zapato: "azul",
      anio: 1975
    }

    expect(isValidDisc(disco1)).toBe(true)
    expect(isValidDisc(disco2)).toBe(false)
  })

  test('No crea discos en el futuro', () => {

    let disco2 = {
      anio: 3500
    }

    expect(isValidDisc(disco2)).toBe(false)
  })

  test('No crea discos con campos vacíos', () => {

    let disco3 = {
      sello:'',
      anio: 1960
    }

    expect(isValidDisc(disco3)).toBe(false)
  })
})

