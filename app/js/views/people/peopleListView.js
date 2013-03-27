define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/TwitterBaseView',
  'collections/topic/SearchCollection',
  'text!templates/topic/searchList.html'
], function($, _, Backbone, TwitterBaseView, SearchCollection, searchListTemplate) {
  var TwitterSearch = TwitterBaseView.extend({
    initialize: function () {
      this.isLoading = false;
      this.collection = new SearchCollection();
    },

    loadResults: function () {
      var that = this;

      this.isLoading = true;
      this.collection.fetch({
        success: function (tweets) {
          console.log("fetch Results");
          $(that.el).html(_.template(searchListTemplate, {tweets: tweets.models, _:_}));
          that.isLoading = false;
        }
      });
    },
  });

  return TwitterSearch;
});
