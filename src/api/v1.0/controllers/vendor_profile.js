/* eslint-disable linebreak-style */
// import jwt from 'jsonwebtoken';
import {
  check, body, sanitizeBody, validationResult,
} from 'express-validator';
import vendorService from '../services/create_vendor';

const createVendorProfile = [
  body('agency_name', 'Please fill agency name').isLength({ min: 2 }).trim(),
  body('location', 'Please fill in a location').isLength({ min: 2 }).trim(),
  body('agency_email').isEmail().withMessage('Type in an actual email').normalizeEmail(),
  body('tel_no').isNumeric().withMessage('Please Enter your phone number').trim(),
  body('service_category', 'Please pick your service category').isLength({ min: 2 }).trim(),
  body('bio', 'fill in your bio').isLength({ max: 120 }).withMessage('Bio must be less than 121 words').trim(),

  sanitizeBody('*').escape(),

  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.send({ errors: errors.array() })
    } else {
      const vendor = {
        agency_name: req.body.agency_name,
        location: req.body.location,
        agency_email: req.body.agency_email,
        tel_no: req.body.tel_no,
        service_category: req.body.service_category,
        bio: req.body.bio,
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
  .then(data => res.send(data));
module.exports = {
  createVendorProfile,
  vendorList,
};
