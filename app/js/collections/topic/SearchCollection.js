define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/TwitterBaseCollection',
  'models/topic/SearchModel'
], function($, _, Backbone, BaseCollection, SearchModel) {
  var SearchCollection = BaseCollection.extend({
    model: SearchModel,

    path: "search/tweets.json?q=backbone",

    parse: function(response) {
		// if(response.paging) {
		// 	this.nextUrl = response.paging.next || null;
		// 	this.prevUrl = response.paging.previous || null;
		// }
		  return response.statuses;
    }
  });

  return SearchCollection;
});