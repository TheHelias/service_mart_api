/* eslint-disable linebreak-style */
// import jwt from 'jsonwebtoken';
import {
  check, body, sanitizeBody, validationResult,
} from 'express-validator';
import vendorService from '../services/create_vendor';

const VendorProfile = require('../models').vendorProfile;

const toSentenceCase = data => data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();

const createVendorProfile = [
  body('agency_name', 'Please fill agency name').isLength({ min: 2 }).trim(),
  body('location', 'Please fill in a location').isLength({ min: 2 }).trim(),
  body('agency_email').isEmail().withMessage('Type in an actual email').normalizeEmail(),
  body('tel_no').isNumeric().withMessage('Please Enter your phone number').trim(),
  body('service_category', 'Please pick your service category').isLength({ min: 2 }).trim(),
  body('bio', 'fill in your bio').isLength({ max: 120 }).withMessage('Bio must be less than 121 words').trim(),
  body('job_specification', 'Tell us what you do').isLength({ min: 3 }).trim(),

  sanitizeBody('*').escape(),

  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() });
    } else {
      const vendor = {
        agency_name: req.body.agency_name,
        location: req.body.location,
        agency_email: req.body.agency_email,
        tel_no: req.body.tel_no,
        service_category: req.body.service_category,
        bio: req.body.bio,
        job_specification: req.body.job_specification,
      };
      return vendorService.createVendor(vendor)
        .then(() => res.send({
          success: true,
          agency_name: vendor.agency_name,
          tel_no: vendor.tel_no,
        }));
    }
  },
];

const vendorList = (req, res) => vendorService.getAll()
  .then(data => res.send({ vendorlists: data }));

const getVendor = (req, res) => vendorService.getById(req.params.id)
  .then(data => res.send({ vendor: data }));

const getCategoryVendors = (req, res) => {
  VendorProfile.findAll({
    limit: 100,
    where: { service_category: toSentenceCase(req.params.service_category) },
  })
    .then(assets => res.send({ category: assets }))
    .catch(err => res.send({ error: err }));
};

const getLocationVendors = (req, res) => {
  VendorProfile.findAll({
    limit: 100,
    where: { location: toSentenceCase(req.params.location) },
  })
    .then(assets => res.send({ category: assets }))
    .catch(err => res.send({ error: err }));
};

module.exports = {
  createVendorProfile,
  vendorList,
  getVendor,
  getCategoryVendors,
  getLocationVendors,
};
