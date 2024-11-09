# File System

Hoy nos encontramos con nuestro primer problema de asincronía en Node

Resultó que `fs.mkdir()` es "más lento" que `fs.rename()` es por esto que nuestro programa entró en error. 

Es momento de idear un mecanismo que nos permita arreglar esta situación.

Dentro de los mecanismos posibles, están los `EventEmitter` que emiten eventos cuando una acción se ha realizado.

Podrías crear una clase que extienda EventEmitter y que notifique cuando se hayan creado tanto carpetas como archivos después de un loop
