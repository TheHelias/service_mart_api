const VendorProfile = require('../models').vendorProfile;

const createVendor = vendor => VendorProfile.create(vendor);
const getAll = () => VendorProfile.findAll();
module.exports = {
  createVendor,
  getAll,
}

