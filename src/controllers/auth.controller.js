const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const { JWT_SECRET } = require("../common/constants");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password, email, firstname, lastname, telefono, genero } = req.body;

  try {
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
      telefono,
      genero,
    });

    await user.save();
    res.status(201).json({ message: "Usuario creado", username: user.username });
  } catch (error) {
    if (error.code === 11000) { 
      res.status(400).json({ message: "El usuario o el correo electrónico ya existen" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Algo salió mal" });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existentUser = await User.findOne({ username });

    if (!existentUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isMatch = bcrypt.compareSync(password, existentUser.password);

    if (!isMatch) {
      res.status(401).json({ message: "Sin autorización" });
      return;
    }

    const token = jwt.sign(
      {
        id: existentUser._id,
        username: existentUser.username,
        role: existentUser.role,
      },
      JWT_SECRET
    );

    res.status(200).json({ access_token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Algo salió mal" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
