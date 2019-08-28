const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const authService = require('../services/auth');
const userService = require('../services/user');

function login(req, res) {
  return authService.authenticate(req.body)
    .then((token) => {
      res.send({
        success: true,
        data: { token },
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: err.message, // not the best error handling.
        // for better error handling visit github repository, link provided below
      });
    });
}
function register(req, res) {
  let {login} = req.body;
  return userService.getUserByLogin(req.body.email || '')
    .then((exists) => {
      if (exists) {
        return res.send({
          success: false,
          message: 'Registration failed. User with this email already registered.',
        });
      }
      const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, config.saltRounds),
      };
      return userService.addUser(user)
        .then(() => res.send({ success: true, password: user.password }));
    });
}
module.exports = {
  register,
  login,
};
