const authController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the  ServiceMart API!',
  }));

  app.post('/api/login', authController.login);
  app.post('/api/register', authController.register);
};
