const Users = require('../models').User;

const addUser = user => Users.create(user);
const getUserByLogin = email => Users.findOne({ where: { email } });
const getAll = () => Users.findAll();
module.exports = {
  addUser,
  getUserByLogin,
  getAll,
};
