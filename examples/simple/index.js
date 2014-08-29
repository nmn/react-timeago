var React = require('react');
var TimeAgo = require('./../../timeago');



var Component = React.DOM.div(null,
  'You opened this page ', TimeAgo({date: Date.now()})
);

React.renderComponent(Component, document.body);