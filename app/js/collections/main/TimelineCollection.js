define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/TwitterBaseCollection'
], function($, _, Backbone, BaseCollection) {
	var TimelineCollection = BaseCollection.extend({
		path: "search/tweets.json?q=backbone",
	});

	return TimelineCollection;
});