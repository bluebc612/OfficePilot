define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/TwitterBaseView',
  'collections/timeline/HomeTimelineCollection',
  'text!templates/timeline/homeTimelineList.html'
], function($, _, Backbone, TwitterBaseView, HomeTimelineCollection, homeTimelineListTemplate) {
  var TwitterSearch = TwitterBaseView.extend({
    initialize: function () {
      this.isLoading = false;
      this.collection = new HomeTimelineCollection();
    },

    loadResults: function () {
      var that = this;

      this.isLoading = true;
      this.collection.fetch({ 
        success: function (tweets) {
          $(that.el).html(_.template(homeTimelineListTemplate, {tweets: tweets.models, _:_}));
          that.isLoading = false;
        }
      });      
    },
  });

  return TwitterSearch;
});