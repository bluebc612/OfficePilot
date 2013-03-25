define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/TwitterBaseCollection'
], function($, _, Backbone, BaseCollection) {
	var TimelineCollection = BaseCollection.extend({
		// Graph path e.g. me/events
		path: "search/tweets.json?q=backbone",
	});

	return TimelineCollection;
});