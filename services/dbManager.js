async function getLocations(mixxxDB, pathToFind, tableName) {
  try {
    const request = `select * from ${tableName} where location like "${pathToFind}%"`;
    const locations = await mixxxDB.all(request);

    return locations;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getLocationById(mixxxDB, id, tableName) {
  const request = `select * from ${tableName} where id=${id}`;
  try {
    const locations = await mixxxDB.get(request);
    return locations;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function clearTrackAnalysis(mixxxDB,tableName){
  const req=`delete from ${tableName}`
  await mixxxDB.run(req);
}

async function updateInDB(mixxxDB, tableName, sanitizedObject) {
  const {
    id,
    location: clearLocation,
    directory: clearDirectory,
    filename: clearFilename,
  } = sanitizedObject;

  const updateRequest = `UPDATE ${tableName} SET location="${clearLocation}", directory="${clearDirectory}", filename="${clearFilename}" WHERE id=${id};`;

  try {
    const result = await mixxxDB.run(updateRequest);
    return true;
  } catch (error) {
    return false;
  }
}

export { getLocations, updateInDB, getLocationById,clearTrackAnalysis };
