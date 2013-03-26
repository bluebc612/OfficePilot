define([
	'jquery',
  	'underscore',
  	'backbone',
  	'collections/base/TwitterBaseCollection'
], function($, _, Backbone, BaseCollection) {
	var UserTimelineCollection = BaseCollection.extend({
		path: "statuses/home_timeline.json",

		parse: function(response) {
			// if(response.paging) {
			// 	this.nextUrl = response.paging.next || null;
			// 	this.prevUrl = response.paging.previous || null;
			// }
			return response;
		},
	});

  return UserTimelineCollection;
});