/**
 * Definir especificaciones de las validaciones
 */

/**
 * User with required params
 * 
 * Valida que el usuario tenga los parametros mínimos para ser creado
 */

import { userWithRequiredParams, validarTelefono } from "../../lib/validations.js"

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
      telefono: 123456789,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      EULA: true
    }
    
    let invalidUser = {
      telefono: "amarazul9",
      nombre: 'Carlitos',
      apellido: 'Lechuga',
      EULA: true
    }
    
    expect(validarTelefono(validUser.telefono)).toBe(true)
    expect(validarTelefono(invalidUser.telefono)).toBe(false)
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

    expect(userWithRequiredParams(invalidUser)).toBe(false)
  })
  
  test('El teléfono es válido', () => {
    let validUser = {
      telefono: 123456789,
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
      telefono: 9876543654210654,
      nombre: 'Pepe',
      apellido: 'Cortizona',
      email: 'pepe@cortizona.cl',
      EULA: true
    }

    // Debe tener 9 dígitos
    expect(validarTelefono(validUser.telefono)).toBe(true)
    expect(validarTelefono(invalidUser1.telefono)).toBe(false)
    expect(validarTelefono(invalidUser2.telefono)).toBe(false)
  })
})

