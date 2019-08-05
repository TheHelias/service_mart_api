import express from 'express';

const router = express.Router();
/* GET home page. */
<<<<<<< HEAD
router.get('/', (req, res) => {
=======
router.get('/', (req, res, next) => {
>>>>>>> reviewed_01
  res.render('index', { title: 'Express' });
});

export default router;
