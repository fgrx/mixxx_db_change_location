import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  isUpdated,
  sanitizeObject,
  sanitizePath,
  getLastPath,
} from "../../services/sanitize";
import { useMixxxDB } from "../../db_connexion";
import { expectedLocation, location } from "../testLocationsDatas";

const mixxxDB = await useMixxxDB("__tests__/testDB.sqlite");

const pathToFind = "C:/";
const newPath = "/";
const tableName = "track_locations";

const requestLocation = `SELECT * FROM track_locations WHERE id = ${location.id}`;

describe(">>>> Sanitize path", () => {
  it("should sanitize an object", () => {
    const sanitizedObject = sanitizeObject(location);

    expect(JSON.stringify(sanitizedObject)).toBe(
      JSON.stringify(expectedLocation)
    );
  });

  it("should return true if object has been updated", () => {
    const result = isUpdated(location, sanitizeObject(location));
    expect(result).toBe(true);

    const result2 = isUpdated(location, location);
    expect(result2).toBe(false);
  });

  it("should find the last node from path to rename it", () => {
    const lastNode = "nodeToFind";
    const path = "myPath/isAwesome/" + lastNode;

    expect(getLastPath(path)).toBe(lastNode);
  });
});
