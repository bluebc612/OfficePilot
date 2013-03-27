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
      'userTimeline': 'showUserTimeline',
      'people': 'showPeople',
      'profile': 'showProfile',
      '*actions': 'defaultAction'
    }
  });
  
var initialize = function(options){
    var appView = options.appView;
    var app_router = new AppRouter;
    
    app_router.on('route:showTopics', function(actions) {
      require(['views/topic/searchListView'], function (tweets) {
        var topicsView = Vm.create(appView, 'TopicView', tweets);
        topicsView.render();
      });
    });

    app_router.on('route:showUserTimeline', function(actions) {
      require(['views/timeline/userTimelineListView'], function (tweets) {
        var topicsView = Vm.create(appView, 'UserTimelineView', tweets);
        topicsView.render();
      });
    });

    app_router.on('route:showPeople', function(actions) {
      require(['views/people/peopleListView'], function (tweets) {
        var topicsView = Vm.create(appView, 'UserTimelineView', tweets);
        topicsView.render();
      });
    });

    app_router.on('route:showProfile', function(actions) {
      require(['views/profile/userProfileView'], function (tweets) {
        var topicsView = Vm.create(appView, 'UserTimelineView', tweets);
        topicsView.render();
      });
    });

    app_router.on('route:defaultAction', function (actions) {
      require(['views/timeline/homeTimelineListView'], function (tweets) {
        var homeView = Vm.create(appView, 'HomeTimelineView', tweets);
        homeView.render();
      });
    });

    // Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
