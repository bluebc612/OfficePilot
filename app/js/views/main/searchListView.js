define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/main/SearchCollection',
  'text!templates/main/searchList.html'
], function($, _, Backbone, Vm, SearchCollection, searchListTemplate){
  var TwitterWidget = Backbone.View.extend({
    el: '.twitter-widget',

    initialize: function () {
      this.isLoading = false;
      this.searchCollection = new SearchCollection();
    },

    render: function () {
      $('.menu li').removeClass('active');
      $('.menu li a[href="#/topics"]').parent().addClass('active');
      
      this.loadResults();
    },

    loadResults: function () {
      var that = this;

      this.isLoading = true;
      this.searchCollection.fetchTweets({ 
        success: function (tweets) {
          console.log("Search Tweets Fetch Success");
          $(that.el).html(_.template(searchListTemplate, {tweets: tweets.models, _:_}));
          that.isLoading = false;
        }
      });      
    },

    events: {
      'scroll': 'checkScroll'
    },
    checkScroll: function () {
      var triggerPoint = 100; // 100px from the bottom
        if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
          this.timelineCollection.page += 1; // Load next page
          this.loadResults();
        }
    }
  });
  return TwitterWidget;
});
