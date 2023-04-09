import { updateInDB } from "../services/dbManager.js";
import { renameFileAndFolder } from "../services/renamePath.js";
import { isUpdated, sanitizeObject } from "../services/sanitize.js";

const sanitizePath = async (params) => {
  const { locationRow, tableName, mixxxDB } = params;

  const sanitizedObject = sanitizeObject(locationRow);

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
