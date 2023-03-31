import mixxxDB from "./db_connexion.js";

const pathToFind = "C:/";
const newPath = "/";
const tableName = "track_locations";

const request = `select * from ${tableName} where location like "${pathToFind}%"`;

mixxxDB.all(request, [], (err, rows) => {
  if (err) {
    console.error(err);
    throw err;
  }

  rows.forEach((row) => {
    let isUpdated = false;

    if (row.location.includes(pathToFind)) {
      row.location = row.location.replace(pathToFind, newPath);
      isUpdated = true;
    }

    if (row.directory.includes(pathToFind)) {
      row.directory = row.directory.replace(pathToFind, newPath);
      isUpdated = true;
    }

    if (isUpdated) {
      const updateRequest = `UPDATE ${tableName} SET location='${row.location}', directory='${row.directory}' WHERE id=${row.id};`;

      mixxxDB.run(updateRequest, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Morceau mise à jour");
        }
      });
    }
  });
});
