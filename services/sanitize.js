import { remove as removeDiacritics } from "diacritics";

const sanitizeObject = (locationObject) => {
  const { id, directory, filename } = locationObject;
  const clearDirectory = removeDiacritics(directory);
  const clearFilename = removeDiacritics(filename);
  const clearLocation = clearDirectory + "/" + clearFilename;

  return {
    id,
    location: clearLocation,
    filename: clearFilename,
    directory: clearDirectory,
  };
};

const isUpdated = (sourceObj, sanitizedObj) =>
  JSON.stringify(sourceObj) !== JSON.stringify(sanitizedObj);

function getLastPath(path) {
  const nodes = path.split("/");
  const lastIndex = nodes.length - 1;
  return nodes[lastIndex];
}

export { isUpdated, sanitizeObject, getLastPath };
