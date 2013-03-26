define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/TwitterBaseCollection'
], function($, _, Backbone, BaseCollection) {
  var SearchCollection = BaseCollection.extend({
    path: "search/tweets.json?q=backbone",
  });

  return SearchCollection;
});