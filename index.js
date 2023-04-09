import { getLocations } from "./services/dbManager.js";
import { useMixxxDB } from "./db_connexion.js";
import { sanitizePath } from "./controller/sanitize.js";

const pathToFind = "C:/";
const newPath = "/";
const tableName = "track_locations";

const mixxxDB = await useMixxxDB("./mixxxdb.sqlite");

const locations = await getLocations(mixxxDB, pathToFind, tableName);

locations.forEach((locationRow) => {
  sanitizePath({ locationRow, pathToFind, newPath, tableName, mixxxDB });
});
