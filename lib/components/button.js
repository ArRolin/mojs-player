'use strict';

exports.__esModule = true;

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _ripple = require('./ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('css/blocks/button.postcss.css');
var CLASSES = require('css/blocks/button.postcss.css.json');

var Button = function (_Module) {
  _inherits(Button, _Module);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Module.apply(this, arguments));
  }

  /*
    Method to declare defaults for the module.
    @private
    @overrides @ Module
  */

  Button.prototype._declareDefaults = function _declareDefaults() {
    _Module.prototype._declareDefaults.call(this);
    this._defaults.link = null;
    this._defaults.title = '';
    this._defaults.onPointerDown = null;
    this._defaults.onPointerUp = null;
    this._defaults.onDoubleTap = null;
  };
  /*
    Initial render method.
    @private
    @overrides @ Module
  */


  Button.prototype._render = function _render() {
    var p = this._props,
        className = 'button',
        tagName = p.link != null ? 'a' : 'div';
    this._addMainElement(tagName);
    this.el.classList.add(CLASSES[className]);
    this.el.setAttribute('title', p.title);
    p.link && this.el.setAttribute('href', p.link);
    this._addListeners();

    this._createRipple();
  };
  /*
    Method to create ripple.
    @private
  */


  Button.prototype._createRipple = function _createRipple() {
    this.ripple = new _ripple2.default({
      className: CLASSES['button__ripple'],
      parent: this.el
    });
  };
  /*
    Method to add event listeners to the icon.
    @private
  */


  Button.prototype._addListeners = function _addListeners() {
    this._addPointerDownEvent(this.el, this._pointerDown.bind(this));
    this._addPointerUpEvent(this.el, this._pointerUp.bind(this));
    this._addPointerUpEvent(document, this._pointerCancel.bind(this));
    (0, _hammerjs2.default)(this.el).on('doubletap', this._doubleTap.bind(this));
  };
  /*
    Method to invoke onPointerDown callback if exist.
    @private
    @param {Object} Original event object.
  */


  Button.prototype._pointerDown = function _pointerDown(e) {
    this.wasTouched = true;
    this._callIfFunction(this._props.onPointerDown);
    this.ripple._hold(e);
  };
  /*
    Method to invoke onPointerUp callback if exist.
    @private
    @param {Object} Original event object.
  */


  Button.prototype._pointerUp = function _pointerUp(e) {
    this.wasTouched = false;
    // e.stopPropagation();
    this._callIfFunction(this._props.onPointerUp);
    this.ripple._release();
  };
  /*
    Method to invoke onPointerCancel callback if exist.
    @private
    @param {Object} Original event object.
  */


  Button.prototype._pointerCancel = function _pointerCancel(e) {
    if (!this.wasTouched) {
      return;
    };
    this.wasTouched = false;
    this.ripple._cancel();
  };
  /*
    Method to invoke onDoubleTap callback if exist.
    @private
    @param {Object} Original event object.
  */


  Button.prototype._doubleTap = function _doubleTap(e) {
    this._callIfFunction(this._props.onDoubleTap);
  };

  return Button;
}(_module2.default);

exports.default = Button;