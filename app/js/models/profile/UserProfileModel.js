define([
	'jquery',
  	'underscore',
  	'backbone',
  	'models/base/TwitterBaseModel'
], function($, _, Backbone, TwitterBaseModel) {
	var UserProfileModel = TwitterBaseModel.extend({
		path: "users/show.json?screen_name=bluebc612",

		parse: function(response) {
			// if(response.paging) {
			// 	this.nextUrl = response.paging.next || null;
			// 	this.prevUrl = response.paging.previous || null;
			// }
			return response;
		},
	});

  return UserProfileModel;
});