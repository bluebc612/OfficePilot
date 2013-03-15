define([
  'jquery',
  'underscore',
  'backbone',
  'collections/base/BaseCollection'
], function($, _, Backbone, BaseCollection) {
	var TimelineCollection = BaseCollection.extend({
		// Graph path e.g. me/events
		path: "search?q=photo&type=post",
	});

	return TimelineCollection;
});