import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import authService from '../services/auth';
import userService from '../services/user';

const { check, body } = require('express-validator');
const { sanitizeBody, validationResult } = require('express-validator');

const login = [
  body('email').isEmail().withMessage('Type in an actual email').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 characters long'),
  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    } else {
      try {
        const token = await authService.authenticate(req.body);
        res.send({
          success: true,
          data: { token },
        });
      }
      catch (err) {
        res.send({
          success: false,
          message: err.message,
        });
      };
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
