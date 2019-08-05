

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/* GET home page. */


router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express',
  });
});
const _default = router;
exports.default = _default;
