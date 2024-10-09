const ldap = require("ldapjs");
const server = ldap.createServer();

// Definir el esquema de atributos personalizado
const users = [
  {
    dn: "uid=1234, ou=employees, dc=example, dc=com",
    attributes: {
      uid: "1234",
      cn: "John Doe",
      sn: "Doe",
      mail: "john.doe@example.com",
      employeeNumber: "001", // Atributo personalizado
      department: "Engineering", // Atributo personalizado
      objectClass: ["top", "person", "organizationalPerson", "inetOrgPerson"], // Esquema básico de clases
    },
  },
  {
    dn: "uid=5678, ou=employees, dc=example, dc=com",
    attributes: {
      uid: "5678",
      cn: "Jane Smith",
      sn: "Smith",
      mail: "jane.smith@example.com",
      employeeNumber: "002",
      department: "Marketing",
      objectClass: ["top", "person", "organizationalPerson", "inetOrgPerson"],
    },
  },
];

// Configurar el servidor LDAP
server.bind("dc=example, dc=com", (req, res, next) => {
  const dn = req.dn.toString();
  const password = req.credentials;

  // Autenticación simple de ejemplo
  if (dn === "cn=admin, dc=example, dc=com" && password === "secret") {
    res.end();
    return next();
  } else {
    return next(new ldap.InvalidCredentialsError());
  }
});

// Configurar búsqueda
server.search("dc=example, dc=com", (req, res, next) => {
  const dn = req.dn.toString();
  const scopeCheck = (userDn, req) => {
    if (req.scope === "base") {
      return userDn === req.dn.toString();
    } else if (req.scope === "one") {
      return (
        userDn.split(",").length === req.dn.toString().split(",").length + 1
      );
    }
    return userDn.endsWith(req.dn.toString());
  };

  // Filtrar usuarios según el DN y el scope de búsqueda
  users
    .filter((user) => scopeCheck(user.dn, req))
    .forEach((user) => {
      res.send({
        dn: user.dn,
        attributes: user.attributes,
      });
    });

  res.end();
  return next();
});

// Iniciar el servidor LDAP en el puerto 389
server.listen(389, () => {
  console.log("Servidor LDAP escuchando en %s", server.url);
});
