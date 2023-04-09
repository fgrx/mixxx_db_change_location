const updateLocation = (location, oldPath, newPath,windowsMigration) => {
  location.location = location.location.replace(oldPath, newPath);
  location.directory = location.directory.replace(oldPath, newPath);

  if(windowsMigration){
    location.location=location.location.replace("/", "\");
    location.directory=location.directory.replace("/", "\");
  }


  return location;
};

export { updateLocation };
