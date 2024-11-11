import * as fs from "node:fs/promises";
import path from "node:path";
import { EventEmitter } from "events";

const evento = new EventEmitter();
const DIRECTORIO = import.meta.dirname;

console.log(DIRECTORIO)

let archivos = await fs.readdir(DIRECTORIO);
const extArchivos = [".txt", ".jpg"];

evento.on("crearCarpetas", async () => {
  const promesaDeCarpetas = extArchivos.map(async (ext) => {
    let directorioNuevo = ext.replace(".", "");
    try {
      await fs.access(path.posix.join(DIRECTORIO, directorioNuevo));
      console.log(`El directorio ya existe`);
    } catch (error) {
      await fs.mkdir(path.posix.join(DIRECTORIO, directorioNuevo));
      console.log(`Directorio creado`);
    }
  });

  /**
   * último paso
   */
  await Promise.all(promesaDeCarpetas);

  /**
   * Avisar 📣
   */
  evento.emit("carpetasCreadas");
});

evento.on("carpetasCreadas", () => {
  archivos.forEach(async (archivo) => {
    let extension = path.posix.extname(archivo);
    if (extArchivos.includes(extension)) {
      try {
        await fs.rename(
          path.posix.join(DIRECTORIO, archivo),
          path.posix.join(DIRECTORIO, extension.replace(".", ""), archivo)
        );
        console.log("Archivo movido exitosamente");
      } catch (error) {
        console.error("Error al mover el archivo", error);
      }
    }
  });
});

evento.emit("crearCarpetas");
