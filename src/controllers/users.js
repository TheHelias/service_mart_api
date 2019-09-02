import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import authService from '../services/auth';
import userService from '../services/user';

const { check, body } = require('express-validator');
const { sanitizeBody, validationResult } = require('express-validator');

const login = [
// username must be an email
  body('email').isEmail().withMessage('Type in an actual email').normalizeEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 characters long'),
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send({ errors: errors.array() });
    } else {
      authService.authenticate(req.body)
        .then((token) => {
          res.send({
            success: true,
            data: { token },
          });
        })
        .catch((err) => {
          res.send({
            success: false,
            message: err.message, // not the error handling.
            // for better error handling visit github repository, link provided below
          });
        });
    }
  },
];
const register = [
  body('email').isEmail().withMessage('Type in an actual email').normalizeEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() })
    } else {
      userService.getUserByLogin(req.body.email || '')
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
  },
];
// let {login} = req.body;


module.exports = {
  register,
  login,
};
