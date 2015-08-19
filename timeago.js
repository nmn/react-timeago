'use strict';

var React = require('react');

var IntlMixin = require('react-intl').IntlMixin;
var FormattedRelative = require('react-intl').FormattedRelative;

module.exports = React.createClass({
    mixins: [IntlMixin],
    displayName: 'Time-Ago',
    timeoutId: 0,
    getDefaultProps: function () {
      return {
        live: true,
        minPeriod: 0,
        maxPeriod: Infinity
      };
    },
    propTypes: {
      live: React.PropTypes.bool.isRequired,
      minPeriod: React.PropTypes.number.isRequired,
      maxPeriod: React.PropTypes.number.isRequired,

      format: React.PropTypes.string,
      value: React.PropTypes.any.isRequired,
      now: React.PropTypes.any
    },
    componentDidMount: function () {
      if (this.props.live) {
        this.tick(true);
      }
    },
    componentDidUpdate: function (lastProps) {
      if (this.props.live !== lastProps.live || this.props.date !== lastProps.date) {
        if (!this.props.live && this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = undefined;
        }
        this.tick();
      }
    },
    componentWillUnmount: function () {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
      }
    },
    tick: function (refresh) {
      if (!this.isMounted() || !this.props.live) {
        return;
      }

      var period = 1000;

      var then = (new Date(this.props.value)).valueOf();
      var now = this.props.now ? (new Date(this.props.now)).valueOf() : Date.now();
      var seconds = Math.round(Math.abs(now - then) / 1000);

      if (seconds < 45) {
        period = 1000;
      } else if (seconds < 60) {
        period = 1000 * 15;
      } else if (seconds < 60 * 60) {
        period = 1000 * 60;
      } else if (seconds < 60 * 60 * 24) {
        period = 1000 * 60 * 60;
      } else {
        period = 0;
      }

      period = Math.min(Math.max(period, this.props.minPeriod), this.props.maxPeriod);

      if (period) {
        this.timeoutId = setTimeout(this.tick, period);
      }

      if (!refresh) {
        this.forceUpdate();
      }
    },
    render: function () {
      return React.createElement(FormattedRelative, this.props);
    }
  }
);
