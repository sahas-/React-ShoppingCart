/** @jsx React.DOM */

var React = require('react');
var AppActions = require('../actions/app-actions.js');
var RemoteFromCart =
  React.createClass({
    handleClick:function(){
      AppActions.removeItem(this.props.index);
    },
    render:function(){
      return <button onClick={this.handleClick}>X</button>
    }
  });


module.exports = RemoteFromCart;