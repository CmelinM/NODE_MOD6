// const { resolve } = require("path");
// const { readdir } = require("fs").promises;

import { resolve } from "path";
import { readdir } from "fs/promises";

async function getFiles(dir) {
  const directories = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    directories.map((directory) => {
      const res = resolve(dir, directory.name);
      return directory.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}


getFiles('.data')