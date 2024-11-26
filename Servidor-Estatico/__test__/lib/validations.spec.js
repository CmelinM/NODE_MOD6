/**
 * Definir especificaciones de las validaciones
 */

/**
 * User with required params
 * 
 * Valida que el usuario tenga los parametros mínimos para ser creado
 */

import { userWithRequiredParams } from "../../lib/validations.js"

describe('Testing de validacines de usuarios', () => {
  test('Retorna falso si EULA no es true', () => {
    let user = {
      telefono: 8768454687,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      EULA: false
    }
    
    expect(userWithRequiredParams(user)).toBe(false)
  })
  
  test('Retorna false si el teléfono sólo tiene numeros', () => {
    let validUser = {
      telefono: 8768454687,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      EULA: true
    }
    
    let invalidUser = {
      telefono: "amar azul9876546",
      nombre: 'Carlitos',
      apellido: 'Lechuga',
      EULA: true
    }
    
    expect(userWithRequiredParams(validUser)).toBe(true)
    expect(userWithRequiredParams(invalidUser)).toBe(false)
  })
  
  test('retorna true si el usuario lleva más datos que los mínimos', () => {
    let validUser = {
      telefono: 8768454687,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      email: 'pepe@cortizona.cl',
      EULA: true
    }
    
    expect(userWithRequiredParams(validUser)).toBe(true)
  })

  test('retorna false si el usuario lleva menos datos que los mínimos', () => {
    let invalidUser = {
      telefono: 8768454687,
      nombre: 'Pepe',
      EULA: true
    }

    expect(userWithRequiredParams(invalidUser)).toBe(true)
  })
  
  test('El teléfono es válido', () => {
    let validUser = {
      telefono: 987654321,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      email: 'pepe@cortizona.cl',
      EULA: true
    }
    let invalidUser1 = {
      telefono: 1234567,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      email: 'pepe@cortizona.cl',
      EULA: true
    }
    let invalidUser2 = {
      telefono: 987654365421,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      email: 'pepe@cortizona.cl',
      EULA: true
    }

    // Debe tener 9 dígitos
    expect(userWithRequiredParams(validUser)).toBe(true)
    expect(userWithRequiredParams(invalidUser1)).toBe(false)
    expect(userWithRequiredParams(invalidUser2)).toBe(false)
  })
})

