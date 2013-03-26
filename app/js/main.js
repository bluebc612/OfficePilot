// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: 'js',
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    sinon: 'libs/sinon/sinon.js',

    // Require.js plugins
    text: 'libs/require/text',
    order: 'libs/require/order',

    // util
    OAuth: 'libs/twitter/jsOAuth',
    // sha1: 'libs/twitter/sha1',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates'
  },
  shim: {
    'OAuth': {
        exports: 'OAuth'
    }
  },
	urlArgs: "bust=" +  (new Date()).getTime()

});

// require([
//   // Load our app module and pass it to our definition function
//   'app',

// ], function(App){
//   // The "app" dependency is passed in as "App"
//   // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
//   App.initialize();
// });

require([
  'app',
  'router',
  'vm'
], function(AppView, Router, Vm) {
  var appView = Vm.create({}, 'AppView', AppView);
  Router.initialize({appView: appView});
  appView.render(); // render() calls Backbone.history when its ready to start
});