import fs from "fs";
import { sanitizeObject } from "./sanitize.js";

function renameFileAndFolder(location) {
  const sanitizedLocation = sanitizeObject(location);

  try {
    //rename file
    const sanitizedFile = `${location.directory}/${sanitizedLocation.filename}`;
    fs.renameSync(location.location, sanitizedFile);

    //rename folder
    const resultRenameFolder = fs.renameSync(
      location.directory,
      sanitizedLocation.directory
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { renameFileAndFolder };
