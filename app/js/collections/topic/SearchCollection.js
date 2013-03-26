define([
	'jquery',
  	'underscore',
  	'backbone',
  	'collections/base/TwitterBaseCollection'
], function($, _, Backbone, BaseCollection) {
  	var SearchCollection = BaseCollection.extend({
    path: "search/tweets.json?q=backbone",

    parse: function(response) {
		// if(response.paging) {
		// 	this.nextUrl = response.paging.next || null;
		// 	this.prevUrl = response.paging.previous || null;
		// }
		return response.statuses;
	},
  });

  return SearchCollection;
});