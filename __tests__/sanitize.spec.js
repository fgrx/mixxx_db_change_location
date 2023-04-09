import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { useMixxxDB } from "../db_connexion";
import { expectedLocation, location } from "./testLocationsDatas";
import { updateInDB } from "../services/dbManager";
import { sanitizePath } from "../controller/sanitize";
import fs from "fs";

const requestLocation = `SELECT * FROM track_locations WHERE id = ${location.id}`;

const mixxxDB = await useMixxxDB("./mixxxdb.sqlite");
const tableName = "track_locations";

const testFolder = "./__tests__/testFile";
const pathRenamed = `${testFolder}/Adolfo Carabelli - Mi evocacion- 1927-1935`;
const fileRenamed = `${pathRenamed}/04. Por que - Alberto Gomez.mp3`;

let originalLine;

const deleteTestPath = (path, file) => {
  const isFileExist = fs.existsSync(file);
  if (isFileExist) {
    fs.unlinkSync(file);
  }

  const isFolderExist = fs.existsSync(path);
  if (isFolderExist) {
    fs.rmdirSync(path);
  }
};

describe(">>>>>> Sanitize", () => {
  beforeAll(async () => {
    fs.mkdirSync(location.directory);
    fs.writeFileSync(location.location, "console.log('hello')", () => {});

    originalLine = await mixxxDB.get(requestLocation);
  });

  afterAll(() => {
    //restore original line
    updateInDB(mixxxDB, "track_locations", location);
    deleteTestPath(pathRenamed, fileRenamed);
    deleteTestPath(location.directory, location.location);
  });

  it("should sanitize a line", async () => {
    const params = { locationRow: location, tableName, mixxxDB };

    const result = await sanitizePath(params);

    expect(result).toBe(true);

    const updatedLine = await mixxxDB.get(requestLocation);

    expect(updatedLine.location).toBe(expectedLocation.location);
  });
});
