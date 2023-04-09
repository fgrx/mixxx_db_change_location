import { open } from "sqlite";
import sqlite3 from "sqlite3";

function useMixxxDB(filename) {
  return open({
    filename,
    driver: sqlite3.Database,
  });
}

export { useMixxxDB };
