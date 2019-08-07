import express from 'express';

const router = express.Router();
/* GET home page. */
<<<<<<< HEAD
<<<<<<< HEAD
router.get('/', (req, res) => {
=======
router.get('/', (req, res, next) => {
>>>>>>> reviewed_01
=======
router.get('/', (req, res) => {
>>>>>>> bnb reviewed
  res.render('index', { title: 'Express' });
});

export default router;
