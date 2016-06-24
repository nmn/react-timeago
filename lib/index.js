'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _localeKR = require('./localeKR');

var _localeKR2 = _interopRequireDefault(_localeKR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Just some simple constants for readability
var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365;

var TimeAgo = function (_Component) {
    _inherits(TimeAgo, _Component);

    function TimeAgo() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, TimeAgo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TimeAgo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.isStillMounted = false, _this.tick = function (refresh) {
            if (!_this.isStillMounted || !_this.props.live) {
                return;
            }

            var then = new Date(_this.props.date).valueOf();
            var now = Date.now();
            var seconds = Math.round(Math.abs(now - then) / 1000);

            var unboundPeriod = seconds < MINUTE ? 1000 : seconds < HOUR ? 1000 * MINUTE : seconds < DAY ? 1000 * HOUR : 0;
            var period = Math.min(Math.max(unboundPeriod, _this.props.minPeriod * 1000), _this.props.maxPeriod * 1000);

            if (period) {
                _this.timeoutId = setTimeout(_this.tick, period);
            }

            if (!refresh) {
                _this.forceUpdate();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimeAgo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.isStillMounted = true;
            if (this.props.live) {
                this.tick(true);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(lastProps) {
            if (this.props.live !== lastProps.live || this.props.date !== lastProps.date) {
                if (!this.props.live && this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                this.tick();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.isStillMounted = false;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = undefined;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var then = new Date(this.props.date).valueOf();
            var now = Date.now();
            var seconds = Math.round(Math.abs(now - then) / 1000);
            var unitStrings = Object.assign({}, TimeAgo.defaultProps.unitStrings, this.props.unitStrings);
            var suffix = then < now ? unitStrings.ago : unitStrings.ago.fromNow;

            var _ref = seconds < MINUTE ? [Math.round(seconds), unitStrings.second] : seconds < HOUR ? [Math.round(seconds / MINUTE), unitStrings.minute] : seconds < DAY ? [Math.round(seconds / HOUR), unitStrings.hour] : seconds < WEEK ? [Math.round(seconds / DAY), unitStrings.day] : seconds < MONTH ? [Math.round(seconds / WEEK), unitStrings.week] : seconds < YEAR ? [Math.round(seconds / MONTH), unitStrings.month] : [Math.round(seconds / YEAR), unitStrings.year];

            var _ref2 = _slicedToArray(_ref, 2);

            var value = _ref2[0];
            var unit = _ref2[1];


            if (value > 1) {
                switch (unit) {
                    case unitStrings.second:
                        unit = unitStrings.seconds;break;
                    case unitStrings.minute:
                        unit = unitStrings.minutes;break;
                    case unitStrings.hour:
                        unit = unitStrings.hours;break;
                    case unitStrings.day:
                        unit = unitStrings.days;break;
                    case unitStrings.week:
                        unit = unitStrings.weeks;break;
                    case unitStrings.month:
                        unit = unitStrings.months;break;
                    case unitStrings.year:
                        unit = unitStrings.years;break;
                }
            }

            var props = _extends({}, this.props);
            props.title = props.title || typeof props.date === 'string' ? props.date : new Date(props.date).toISOString().substr(0, 16).replace('T', ' ');

            if (props.component === 'time') {
                props.dateTime = new Date(props.date).toISOString();
            }

            delete props.date;
            delete props.formatter;
            delete props.component;

            var Komponent = this.props.component;
            return _react2.default.createElement(
                Komponent,
                props,
                this.props.formatter(value, unit, suffix, then)
            );
        }
    }]);

    return TimeAgo;
}(_react.Component);

TimeAgo.displayName = 'TimeAgo';
TimeAgo.propTypes = {
    /** If the component should update itself over time */
    live: _react.PropTypes.bool.isRequired,
    /** minimum amount of time in seceonds between re-renders */
    minPeriod: _react.PropTypes.number.isRequired,
    /** Maximum time between re-renders in seconds. The component should update at least once every `x` seconds */
    maxPeriod: _react.PropTypes.number.isRequired,
    /** The container to render the string into. You could use a string like `span` or a custom component */
    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
    /** A function to decide how to format the date.
    * If you use this, `react-timeago` is basically acting like a glorified `setInterval`.
    */
    formatter: _react.PropTypes.func.isRequired,
    /** The Date to display. An actual Date object or something that can be fed to new Date */
    date: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.instanceOf(Date)]).isRequired,
    /** unit strings for locale
    * ago: "ago"
    * fromNow: "from now"
    * second: "second"
    * seconds: "seconds"
    * minute: "minute"
    * minutes: "minutes"
    * hour: "hour"
    * hours: "hours"
    * day: "day"
    * days: "days"
    * week: "week"
    * weeks: "weeks"
    * month: "month"
    * months: "months"
    * year: "year"
    * years: "years"
    */
    unitStrings: _react.PropTypes.object.isRequired
};
TimeAgo.defaultProps = {
    live: true,
    component: 'time',
    minPeriod: 0,
    maxPeriod: Infinity,
    formatter: function formatter(value, unit, suffix) {
        return value + unit + suffix;
    },

    unitStrings: {
        ago: " ago",
        fromNow: " from now",
        second: " second",
        seconds: " seconds",
        minute: " minute",
        minutes: " minutes",
        hour: " hour",
        hours: " hours",
        day: " day",
        days: " days",
        week: " week",
        weeks: " weeks",
        month: " month",
        months: " months",
        year: " year",
        years: " years"
    }
};
exports.default = TimeAgo;