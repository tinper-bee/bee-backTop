'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeIcon = require('bee-icon');

var _beeIcon2 = _interopRequireDefault(_beeIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    visibilityHeight: _react.PropTypes.number,
    click: _react.PropTypes.func,
    target: _react.PropTypes.func
};
var defaultProps = {
    visibilityHeight: 400,
    click: function click() {},
    target: function target() {
        return window;
    },
    character: _react2["default"].createElement(_beeIcon2["default"], { type: 'uf-top-up' }),
    clsPrefix: 'u-backtop'
};

var Backtop = function (_Component) {
    _inherits(Backtop, _Component);

    function Backtop(props) {
        _classCallCheck(this, Backtop);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            show: false
        };
        _this.click = _this.click.bind(_this);
        _this.scroll = _this.scroll.bind(_this);
        return _this;
    }

    Backtop.prototype.componentDidMount = function componentDidMount() {
        this.scroll();
    };

    Backtop.prototype.scroll = function scroll() {
        var self = this;
        this.props.target().onscroll = function () {
            if ((self.props.target().scrollY || self.props.target().scrollTop) >= self.props.visibilityHeight) {
                self.setState({
                    show: true
                });
            } else {
                self.setState({
                    show: false
                });
            }
        };
    };

    Backtop.prototype.click = function click() {
        var _this2 = this;

        var height = this.props.target().scrollY || this.props.target().scrollTop;
        var timer = function timer(height) {
            var self = _this2;
            var h = Math.floor(height / 3);
            self.props.target().scrollTo ? self.props.target().scrollTo(0, h) : self.props.target().scrollTop = h;
            if (h > 0) {
                window.clearInterval(window.backTopTimer);
                window.backTopTimer = window.setInterval(function () {
                    timer(h);
                }, 30);
            } else {
                _this2.setState({
                    show: false
                });
                window.clearInterval(window.backTopTimer);
                return;
            }
        };
        timer(height);
        this.props.click();
    };

    Backtop.prototype.render = function render() {
        var _props = this.props,
            className = _props.className,
            children = _props.children,
            visibilityHeight = _props.visibilityHeight,
            click = _props.click,
            target = _props.target,
            character = _props.character,
            clsPrefix = _props.clsPrefix,
            others = _objectWithoutProperties(_props, ['className', 'children', 'visibilityHeight', 'click', 'target', 'character', 'clsPrefix']);

        className = className ? className : '';
        className = !this.state.show ? clsPrefix + ' hide ' + className : clsPrefix + ' ' + className;
        return _react2["default"].createElement(
            'span',
            _extends({}, others, { className: className, onClick: this.click }),
            children ? children : this.props.character
        );
    };

    return Backtop;
}(_react.Component);

;
Backtop.propTypes = propTypes;
Backtop.defaultProps = defaultProps;
exports["default"] = Backtop;
module.exports = exports['default'];