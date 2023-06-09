import { clearTrackAnalysis, getLocations } from "./services/dbManager.js";
import { useMixxxDB } from "./db_connexion.js";
import { sanitizePath } from "./controller/sanitize.js";
import { updateLocation } from "./services/updateLocation.js";

const pathToFind = "/home/fabien/Musique";
const newPath = "C:/Users/fabgr/Music";
const tableName = "track_locations";

const mixxxDB = await useMixxxDB("./mixxxdb.sqlite");

const locations = await getLocations(mixxxDB, pathToFind, tableName);

locations.forEach((locationRow) => {

  clearTrackAnalysis(mixxxDB,"track_analysis")

  const locationWithNewUrl = updateLocation(locationRow, pathToFind, newPath);

  sanitizePath({
    locationRow: locationWithNewUrl,
    pathToFind,
    newPath,
    tableName,
    mixxxDB,
  });
});
