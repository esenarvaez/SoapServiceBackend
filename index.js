const express = require("express");
const bodyParser = require("body-parser");
const soap = require("soap");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/database");
const userService = require("./routes/soapRoutes");

const app = express();
app.use(bodyParser.raw({ type: "application/soap+xml" }));

// Conectar a la base de datos MongoDB
connectDB();

// Cargar el WSDL
const wsdlPath = path.join(__dirname, "wsdl", "user.wsdl");
const wsdlXML = fs.readFileSync(wsdlPath, "utf8");

// Crear el servidor SOAP
soap.listen(app, "/user", userService, wsdlXML);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
