const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");


const usersRouter = Router();

const expressValidations = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ errors: result.array() });
  } else {
    next();
  }
};



// http://localhost:5000/api/users/register
usersRouter.post(
  "/register",
  [
    check("username", "Debe mandar nombre de usuario").notEmpty(),
    check("username", "Debe ser alphanumerico").isAlphanumeric(),
    check("password", "Debe mandar password de usuario").notEmpty(),
    check("email", "Debe tener formato de mail").notEmpty(),
    check("email", "Debe tener formato de mail").isEmail(),
    check("firstname", "Debe mandar nombre").notEmpty().isString(),
    check("lastname", "Debe mandar nombre").notEmpty().isString(),
    check("telefono", "Debe mandar telefono").notEmpty().isNumeric(),
    check("genero", "Debe seleccionar un género").notEmpty(),
  ],
  expressValidations,
  registerUser
);

// http://localhost:5000/api/users/login
usersRouter.post(
  "/login",
  [
    check("username", "Debe mandar nombre de usuario").notEmpty(),
    check("username", "Debe ser alphanumerico").isAlphanumeric(),
    check("password", "Debe mandar password de usuario").notEmpty(),
  ],
  expressValidations,
  loginUser
);

module.exports = usersRouter;
