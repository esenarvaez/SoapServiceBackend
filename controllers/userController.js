const userService = require("../services/userService");

const addUser = async (args) => {
  const { email, name } = args;
  console.log("Datos recibidos en AddUser:", email, name);
  try {
    const result = await userService.addUser(email, name);
    console.log("Resultado de agregar usuario:", result);
    return { success: true };
  } catch (error) {
    console.log("Resultado de agregar usuario:", result);
    return { success: false };
  }
};

const deleteUser = async (args) => {
  const { email } = args;
  console.log("Datos recibidos en DeleteUser:", email);
  try {
    const result = await userService.deleteUser(email); // Aquí usamos el resultado de la eliminación
    if (result.deletedCount > 0) {
      console.log("Usuario eliminado:", email);
      return { success: true };
    } else {
      console.log("Usuario no encontrado:", email);
      return { success: false, message: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log("Error al eliminar usuario:", error);
    return { success: false, message: "Error al eliminar usuario" };
  }
};

const getUser = async (args) => {
  const { email } = args;
  console.log("Datos recibidos en GetUser:", email);
  try {
    const user = await userService.getUser(email);
    if (user) {
      console.log("Usuario encontrado:", user);
      return {
        success: true,
        user: user ? { email: user.email, name: user.name } : null,
      }; // Devolvemos el objeto usuario completo
    } else {
      console.log("Usuario no encontrado:", email);
      return { success: false, message: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log("Error al obtener usuario:", error);
    return { success: false, message: "Error al obtener usuario" };
  }
};

module.exports = {
  addUser,
  deleteUser,
  getUser,
};
