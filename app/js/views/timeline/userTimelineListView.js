define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/TwitterBaseView',
  'collections/timeline/UserTimelineCollection',
  'text!templates/timeline/userTimelineList.html'
], function($, _, Backbone, TwitterBaseView, UserTimelineCollection, userTimelineListTemplate) {
  var TwitterSearch = TwitterBaseView.extend({
    initialize: function () {
      this.isLoading = false;
      this.collection = new UserTimelineCollection();
    },

    loadResults: function () {
      var that = this;

      this.isLoading = true;
      this.collection.fetch({ 
        success: function (tweets) {
          $(that.el).html(_.template(userTimelineListTemplate, {tweets: tweets.models, _:_}));
          that.isLoading = false;
        }
      });      
    },
  });

  return TwitterSearch;
});