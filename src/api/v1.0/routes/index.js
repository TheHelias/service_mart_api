const authController = require('../controllers').users;
const vendorController = require('../controllers').vendorProfile;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the  ServiceMart API!',
  }));

  app.post('/api/login', authController.login);
  app.post('/api/register', authController.register);
  app.post('/api/create_vendor', vendorController.createVendorProfile);
  app.get('/api/vendors', vendorController.vendorList);
  app.get('/api/users', authController.userList);
};
