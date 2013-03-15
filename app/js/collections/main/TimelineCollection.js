define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/BaseCollection',
  'libs/facebook/config'
], function($, _, Backbone, BaseCollection, Config) {
	var TimelineCollection = BaseCollection.extend({
		// Graph path e.g. me/events
		path: "search?q=photo&type=post",
	});

	return TimelineCollection;
});