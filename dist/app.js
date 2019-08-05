

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _path = _interopRequireDefault(require('path'));

const _cookieParser = _interopRequireDefault(require('cookie-parser'));

const _morgan = _interopRequireDefault(require('morgan'));

const _index = _interopRequireDefault(require('./routes/index'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false,
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, '../public')));
app.use('/', _index.default);
const _default = app;
exports.default = _default;
