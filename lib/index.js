'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Star = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _star = require('./star');

Object.defineProperty(exports, 'Star', {
  enumerable: true,
  get: function get() {
    return _star.Star;
  }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _star2 = _interopRequireDefault(_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rater = function (_Component) {
  _inherits(Rater, _Component);

  function Rater(props) {
    _classCallCheck(this, Rater);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rater).call(this, props));

    _this.state = {
      lastRating: props.rating,
      rating: props.rating,
      isRating: false
    };
    return _this;
  }

  _createClass(Rater, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        rating: this.props.rating
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        rating: nextProps.rating
      });
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter(e) {
      var rating = getRatingFromDOMEvent(e, this.props);
      if (rating > 0) {
        this.setState({
          rating: 0,
          isRating: true
        });
      }
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      var rating = getRatingFromDOMEvent(e, this.props),
          callback = this.props.onRate;
      if (rating > 0) {
        this.setState({
          rating: rating,
          isRating: true
        });
        callback && callback(rating);
      }
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      var callback = this.props.onRate,
          state = this.state;
      callback && callback(state.lastRating);
      this.setState({
        rating: state.lastRating,
        isRating: false
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var rating = getRatingFromDOMEvent(e, this.props),
          lastRating = Number(this.state.lastRating),
          callback = this.props.onRate;
      if (rating < 0 || e.target.getAttribute('class') && e.target.getAttribute('class').indexOf('is-disabled') > -1) {
        return;
      }
      this.setState({
        rating: rating,
        lastRating: rating
      });
      callback && callback(rating, lastRating);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var total = Number(this.props.total),
          limit = Number(this.props.limit),
          rating = Number(this.state.rating),
          interactive = this.props.interactive,
          children = Array.prototype.concat(this.props.children).filter(Boolean),
          nodes = void 0;
      limit = this.props.limit === void 0 ? total : limit;
      nodes = Array(total).join(',').split(',').map(function (_, i) {
        var starProps = {
          isActive: !_this2.state.isRating && i < rating ? true : false,
          willBeActive: _this2.state.isRating && i < rating ? true : false,
          isDisabled: i < limit ? false : true,
          key: 'star-' + i
        };
        if (children.length) {
          return _react2.default.cloneElement(children[i % children.length], starProps);
        } else {
          return _react2.default.createElement(_star2.default, starProps);
        }
      });
      if (interactive) {
        return _react2.default.createElement(
          'div',
          _extends({ className: 'react-rater',
            onMouseEnter: this.handleMouseEnter.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this),
            onMouseMove: this.handleMouseMove.bind(this),
            onClick: this.handleClick.bind(this)
          }, this.props),
          nodes
        );
      } else {
        return _react2.default.createElement(
          'div',
          _extends({ className: 'react-rater is-disabled' }, this.props),
          nodes
        );
      }
    }
  }]);

  return Rater;
}(_react.Component);

exports.default = Rater;


Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true
};

function getRatingFromDOMEvent(e, props) {
  var allStars = Array.apply(null, e.currentTarget.childNodes),
      star = findStarDOMNode(e.target, allStars, e.currentTarget),
      index = allStars.indexOf(star),
      rating = index + 1,
      limit = Number(props.limit);
  if (index < 0) {
    return -1;
  }
  limit = props.limit === void 0 ? props.total : limit;
  rating = rating < limit ? rating : limit;
  return Number(rating);
}

function findStarDOMNode(node, stars, container) {
  while (node !== container && stars.indexOf(node) === -1) {
    node = node.parentNode;
  }
  return node;
}