const User = require("../models/user");

const addUser = async (email, name) => {
  console.log("Guardando usuario en la base de datos:", email, name);
  const user = new User({ email, name });
  return await user.save();
};

const deleteUser = async (email) => {
  console.log("Eliminando usuario de la base de datos:", email);
  return await User.deleteOne({ email });
};

const getUser = async (email) => {
  console.log("Buscando usuario en la base de datos:", email);
  return await User.findOne({ email });
};

module.exports = {
  addUser,
  deleteUser,
  getUser,
};
