import * as fs from "node:fs/promises";
import * as path from "node:path";
export const readFile = async (folder, fileName) => {
  /**   * descriptorArchivo -> Número que representa de forma única el archivo a manipular   */ let descriptorArchivo;
  try {
    /**     * Intentamos leer archivo     */ const filePath = path.join(
      folder,
      fileName
    );
    console.log(filePath);
    descriptorArchivo = await fs.open(filePath, "r");
    const data = await fs.readFile(descriptorArchivo, "utf8");
    return JSON.parse(data);
  } catch (err) {
    /**     * Enviamos error a consola     */ 
    console.error(err);
  } finally {
    /**     * Cerramos archivo     */ 
    if (descriptorArchivo) {
      await descriptorArchivo.close();
    }
  }
}; // @TODO eliminar prueba del readFile
console.log(await readFile('.data/usuarios', '987654312.json'));
