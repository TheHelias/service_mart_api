/* eslint-disable linebreak-style */
const authController = require('../controllers').users;
const vendorController = require('../controllers').vendorProfile;
const authMiddleware = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the  ServiceMart API!',
  }));

  app.post('/api/login', authController.login);
  app.post('/api/register', authController.register);
  app.post('/api/create_vendor', vendorController.createVendorProfile);
  app.get('/api/vendors', authMiddleware.checkAuth, vendorController.vendorList);
  app.get('/api/vendors/:id', vendorController.getVendor);
  app.get('/api/vendor/category/:service_category', vendorController.getCategoryVendors);
  app.get('/api/vendor/location/:location', vendorController.getLocationVendors);
  app.get('/api/users', authController.userList);
  app.post('/api/search', vendorController.findVendorByName);
  app.get('/api/checkToken', authMiddleware.checkAuth, (req, res) => {
    res.sendStatus(200);
  });
};
