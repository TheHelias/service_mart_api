/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  check, body, sanitizeBody, validationResult,
} from 'express-validator';
import config from '../config/config';
import authService from '../services/auth';
import userService from '../services/user';

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
  check('password').isLength({ min: 6 }).withMessage('must be at least 6 characters long'),
  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() })
    } else {
      const exists = await userService.getUserByLogin(req.body.email || '');  
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
        
    }
  },
];

const userList = (req, res) => userService.getAll()
  .then(data => res.send(data));
module.exports = {
  register,
  login,
  userList,
};
