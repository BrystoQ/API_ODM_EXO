const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userRegister = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.loginRegister = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ message: "Paire Identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire Identifiant/mot de passe incorrecte" });
            } else {
              res.status(200);
              let userData = {
                id: user._id,
                email: user.email,
                role: "admin",
              };
              jwt.sign(
                userData,
                process.env.JWT_KEY,
                { expiresIn: "30 days" },
                (error, token) => {
                  if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({ message: "Impossible de générer le token" });
                  } else {
                    res.status(200);
                    res.json({ token });
                  }
                }
              );
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.roleUser = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, { new: true })
    .then((user) => {
      user.role = req.body.role;
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur modifié !" }))
        .catch((error) =>
          res.status(400).json({ message: "La modification a échoué" })
        );
    })
    .catch((error) =>
      res.status(401).json({ message: "Modification impossible" })
    );
};

// Used for Debug
exports.getUsers = (req, res) =>
  User.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
