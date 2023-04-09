const updateLocation = (location, oldPath, newPath) => {
  location.location = location.location.replace(oldPath, newPath);
  location.directory = location.directory.replace(oldPath, newPath);
  return location;
};

export { updateLocation };
