import { describe, expect, it } from "vitest";
import {
  getLocationById,
  getLocations,
  updateInDB,
} from "../../services/dbManager";

import { useMixxxDB } from "./db_connexion.js";
import { expectedLocation, location } from "../testLocationsDatas";

const mixxxDB = await useMixxxDB("./mixxxdb.sqlite");

const pathToFind = "C:/";
const tableName = "track_locations";

describe(">>>> DBmanager", () => {
  it("should return a list of locations starting with pathtofind", async () => {
    const locations = await getLocations(mixxxDB, pathToFind, tableName);
    expect(locations[0].location).toContain(pathToFind);
  });

  it("should return one record", async () => {
    const result = await getLocationById(mixxxDB, location.id, tableName);
    expect(result.id.toString()).toBe(location.id);
  });

  it("Should update a line with datas", async () => {
    const result = await updateInDB(mixxxDB, tableName, expectedLocation);
    expect(result).toBe(true);

    const updatedLine = await getLocationById(mixxxDB, location.id, tableName);
    expect(updatedLine.location).toBe(expectedLocation.location);
    expect(updatedLine.directory).toBe(expectedLocation.directory);
    expect(updatedLine.filename).toBe(expectedLocation.filename);

    // test reinit
    updateInDB(mixxxDB, tableName, location);
  });
});
