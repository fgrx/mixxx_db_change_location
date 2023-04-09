import { updateInDB } from "../services/dbManager.js";
import { renameFileAndFolder } from "../services/changeFilePath.js";
import { isUpdated, sanitizeObject } from "../services/sanitize.js";

const sanitizePath = async (params) => {
  const { locationRow, tableName, mixxxDB, pathToFind, newPath } = params;

  const sanitizedObject = sanitizeObject(locationRow, pathToFind, newPath);

  if (isUpdated(locationRow, sanitizedObject)) {
    const resultRename = renameFileAndFolder(locationRow);
    if (resultRename) {
      const res = await updateInDB(mixxxDB, tableName, sanitizedObject);
      return res || false;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export { sanitizePath };
