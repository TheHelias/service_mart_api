/* eslint-disable linebreak-style */
const VendorProfile = require('../models').vendorProfile;

const createVendor = vendor => VendorProfile.create(vendor);
const getAll = () => VendorProfile.findAll();
const getById = id => VendorProfile.findByPk(id);

module.exports = {
  createVendor,
  getAll,
  getById,
};
