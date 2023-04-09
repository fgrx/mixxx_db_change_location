import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  renameFileAndFolder,
  getLastPath,
} from "../../services/changeFilePath";
import fs from "fs";

const testFolder = "./__tests__/testFile";

const location = {
  id: "7354",
  location: `${testFolder}/Adolfo Carabelli - Mi evocación- 1927-1935/04. Por qué - Alberto Gómez.mp3`,
  filename: "04. Por qué - Alberto Gómez.mp3",
  directory: `${testFolder}/Adolfo Carabelli - Mi evocación- 1927-1935`,
};

const pathRenamed = `${testFolder}/Adolfo Carabelli - Mi evocacion- 1927-1935`;
const fileRenamed = `${pathRenamed}/04. Por que - Alberto Gomez.mp3`;

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

describe(">>>>> Rename Path", () => {
  //it("should rename a file", () => {});

  beforeAll(() => {
    deleteTestPath(pathRenamed, fileRenamed);
    deleteTestPath(location.directory, location.location);

    fs.mkdirSync(location.directory);
    fs.writeFileSync(location.location, "console.log('hello')", () => {});
  });

  it("should rename the last element (album name)", () => {
    const isRenamed = renameFileAndFolder(location);

    expect(isRenamed).toBe(true);

    const isFileExist = fs.existsSync(pathRenamed);

    expect(isFileExist).toBe(true);
  });

  afterAll(() => {
    deleteTestPath(pathRenamed, fileRenamed);
    deleteTestPath(location.directory, location.location);
  });
});
