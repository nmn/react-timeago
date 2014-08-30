/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

  displayName: 'Time-Ago',

  getDefaultProps: function(){
    return {
      live: true
    };
  },

  componentDidMount: function(){
    if(this.props.live) {
      this.tick(true);
    }
  },

  tick: function(refresh){
    if(!this.isMounted()){
      return;
    }

    var period = 1000;

    var then = (new Date(this.props.date)).valueOf();
    var now = Date.now();
    var seconds = Math.round(Math.abs(now-then)/1000);

    if(seconds < 60){
      period = 1000;
    } else if(seconds < 60*60) {
      period = 1000 * 60;
    } else if(seconds < 60*60*24) {
      period = 1000 * 60 * 60;
    } else {
      period = 0;
    }

    if(!!period){
      setTimeout(this.tick, period);
    }

    if(!refresh){
      this.forceUpdate();
    }
  },

  render: function(){

    var then = (new Date(this.props.date)).valueOf();
    var now = Date.now();
    var seconds = Math.round(Math.abs(now-then)/1000);

    var suffix = then < now ? 'ago' : 'from now';

    var content;
    var unit;

    if(seconds < 60){
      content = Math.round(seconds);
      unit = 'second';
    } else if(seconds < 60*60) {
      content = Math.round(seconds/60);
      unit = 'minute';
    } else if(seconds < 60*60*24) {
      content = Math.round(seconds/(60*60));
      unit = 'hour';
    } else if(seconds < 60*60*24*7) {
      content = Math.round(seconds/(60*60*24));
      unit = 'day';
    } else if(seconds < 60*60*24*30) {
      content = Math.round(seconds/(60*60*24*7));
      unit = 'week';
    } else if(seconds < 60*60*24*365) {
      content = Math.round(seconds/(60*60*24*30));
      unit = 'month';
    } else {
      content = Math.round(seconds/(60*60*24*365));
      unit = 'year';
    }

    if(content !== 1){
      unit += 's';
    }

    return React.DOM.span(
      {
        className:this.props.className || '',
        style: this.props.style || {},
        id: this.props.id || ''
      },
      content + ' ' + unit + ' ' + suffix
    );
  }
});
