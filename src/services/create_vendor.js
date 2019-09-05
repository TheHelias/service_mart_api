const VendorProfile = require('../models').vendorProfile;

const createVendor = vendor => VendorProfile.create(vendor);
module.exports = {
  createVendor,
}

