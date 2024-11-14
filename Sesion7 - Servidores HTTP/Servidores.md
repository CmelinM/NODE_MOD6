# Servidores HTTP

Hasta el momento hemos estudiado servidores TCP, donde no nos hemos preocupado del protocolo de comunicación.

Con la llegada de HTML en 1989, Internet se transforma en una plataforma de consumo de contenidos, usando dos aplicaciones que existían.

1. Navegador
2. Servidor de archivos estáticos.

En 1994 se proponen los estándares para [URI][uri-historico] y [URL][url-historico], que permiten localizar de manera única recursos en internet.

```plain
https://es.wikipedia.org/wiki/URL

Protocolo: https
Servidor: es.wikipedia.org
Ruta: /wiki/URL
```

En 1995 nace el protocolo RFC para [HTML 2.0][html2.0] como lenguaje de marcado y en 1996 nace el primer protocolo RFC para [HTTP/1.0][http-1.0], delegado rápidamente en 1997 por [HTTP/1.1][http-1.1]

## Protocolo HTTP

El protocolo HTTP es **transaccional** de tipo **solicitud-respuesta**. En una conexión normal se podrían visualizar los siguientes pasos: 

1. Se crea el socket de conexión normalmente TCP
2. El cliente envía una solicitud **GET** del recurso al servidor (a través de la conexión), esto era normalmente un documento HTML en el servidor.
3. El servidor envía el recurso en la respuesta, e identifica el tipo de recurso que está enviando con un **tipo MIME**
4. Se cierra el socket de conexión

## Tipo MIME

El tipo MIME define la naturaleza del recurso o fichero en Web, Email, OS, ..., tiene una estructura del la forma: **"tipo/subtipo"**:

- text/plain, text/html, text/css, ...
- image/gif, image/png, image/jpg, ...

### Extensión

En un OS para poder asociar archivos (ficheros) a tipos MIME se trabaja con extensiones:

- **text/plain**: *.txt, *.text, *.conf
- **text/html**: *.html, *.htm
- **text/css**: *.css
- **image/gif**: *.gif
- **image/jpeg**: *.jpeg, *.jpg, *.jpe


## Estado del servidor

Por convención existe una serie de códigos de estado que indican el estado de respuesta respecto a una solicitud determinada: 

- **200 OK**: Se encontró el recurso y fue enviado
- **400 Bad request**: El tipo de transacción no está soportado, o la solicitud fue mal formulada.
- **404 Not Found**: No está el recurso solicitado en el servidor.

## Solicitud y Respuesta HTTP

Toda solicitud y respuesta HTTP tiene la misma estructura con dos partes: 

- **Cabecera (*header*)**: Es un texto (string) terminado por una línea en blanco (`\n\n`) con dos partes:
    
    - **Primera Línea**:  Método de la solicitud, ruta al recurso, versión del protocolo.
    - **Bloque de parámetros**: Cada parámetro usa una sóla línea

- **Cuerpo**: Parte reservada para los datos, se indica el tipo MIME enviado.

### Ejemplo solicitud:

```text
POST /auth/login HTTP/1.1
Content-Type: application/json
User-Agent: PostmanRuntime/7.41.2
Accept: */*
Cache-Control: no-cache
Postman-Token: 1c0939e2-e8d1-4fa3-b158-c8086d8578b7
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 99

{
    "email": "michael.lawson@reqres.in",
    "userName":"Michael",
    "password":"123456"
} 
```

En este caso La solicitud está compuesta de:

#### Cabecera:

- Primera Línea:

```text
POST /auth/login HTTP/1.1
```

- Parametros

```text
Content-Type: application/json
User-Agent: PostmanRuntime/7.41.2
Accept: */*
Cache-Control: no-cache
Postman-Token: 1c0939e2-e8d1-4fa3-b158-c8086d8578b7
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 99
```

#### Cuerpo:

Para esta solicitud el cuerpo se corresponde con el siguiente texto, y el tipo MIME fue identificado en los parametros a través de  `Content-Type: application/json`:

```text
{
    "email": "michael.lawson@reqres.in",
    "userName":"Michael",
    "password":"123456"
} 
```

### Ejemplo de Respuesta

Las respuestas tienen el mismo formato:

```text
HTTP/2 200 
date: Thu, 14 Nov 2024 14:54:51 GMT
content-type: text/html; charset=UTF-8
x-powered-by: PHP/7.4.33
vary: Accept-Encoding
strict-transport-security: max-age=31536000; includeSubDomains
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
last-modified: Fri, 08 Nov 2024 03:45:13 GMT
cache-control: max-age=1200
cf-cache-status: HIT
age: 55541
server: cloudflare
cf-ray: 8e27d6d498a4b4ea-SCL
alt-svc: h3=":443"; ma=86400


<!DOCTYPE html PUBLIC "- ....
# Respuesta truncada
```

#### Cabecera:
La cabecera de respuesta tiene: 
 - Primera Línea: 

    ```text
    HTTP/2 200 
    ```

- Parametros:

    ```text
    date: Thu, 14 Nov 2024 14:54:51 GMT
    content-type: text/html; charset=UTF-8
    x-powered-by: PHP/7.4.33
    vary: Accept-Encoding
    strict-transport-security: max-age=31536000; includeSubDomains
    x-frame-options: SAMEORIGIN
    x-xss-protection: 1; mode=block
    x-content-type-options: nosniff
    last-modified: Fri, 08 Nov 2024 03:45:13 GMT
    cache-control: max-age=1200
    cf-cache-status: HIT
    age: 55541
    server: cloudflare
    cf-ray: 8e27d6d498a4b4ea-SCL
    alt-svc: h3=":443"; ma=86400
    ```

### Cuerpo

> [!NOTE]
> Si quieres obtener una respuesta plana de respuesta HTTP se puede usar el comando de linux `curl -i <url> > archivo_salida.txt`

```text
<!DOCTYPE html PUBLIC "- ....
# Respuesta truncada

```

Con el texto del HTML, y definido el tipo MIME en `content-type: text/html; charset=UTF-8`

[url-historico]: https://datatracker.ietf.org/doc/rfc1738/

[uri-historico]: https://datatracker.ietf.org/doc/rfc1630/
[html2.0]: https://datatracker.ietf.org/doc/rfc1866/
[http-1.0]: https://datatracker.ietf.org/doc/rfc1945/
[http-1.1]: https://datatracker.ietf.org/doc/rfc2068/

