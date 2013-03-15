define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function($, _, Backbone, Vm) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'topics': 'showTopics',
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(options){
    var appView = options.appView;
    var app_router = new AppRouter;
    
    app_router.on('route:showTopics', function(actions) {
      require(['views/main/FacebookListView'], function (TwitterWidget) {
        var twitterView = Vm.create(appView, 'TwitterWidget', TwitterWidget);
        twitterView.render();
      });
    });

    app_router.on('route:defaultAction', function (actions) {
      require(['views/home/HomeView'], function (HomeView) {
        var homeView = Vm.create(appView, 'HomeView', HomeView);
        homeView.render();
      });
    });

    // Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
