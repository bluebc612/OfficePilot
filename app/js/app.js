define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'text!templates/layout.html',
], function($, _, Backbone, Vm, Events, layoutTemplate){
  var AppView = Backbone.View.extend({
    el: '.container',

    initialize: function () {
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.crossDomain ={
          crossDomain: true
        };
        options.xhrFields = {
          withCredentials: true
        };
      });
    },
    render: function () {
      var that = this;
      $(this.el).html(layoutTemplate);
      Backbone.history.start();
    } 
  });
  return AppView;
});

// define([
//   'jquery', 
//   'underscore', 
//   'backbone',
//   'router', // Request router.js
// ], function($, _, Backbone, Router){
//   var initialize = function(){
//     // Pass in our Router module and call it's initialize function
//     Router.initialize();
//   };

//   return { 
//     initialize: initialize
//   };
// });

