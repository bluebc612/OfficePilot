define([
	'jquery',
  	'underscore',
  	'backbone',
  	'libs/twitter/config',
  	'OAuth'
], function($, _, Backbone, Config, OAuth) {
	var oauth = OAuth({
	    consumerKey: Config.consumerKey,
	    consumerSecret: Config.consumerSecret,
	    accessTokenKey: Config.accessToken,
	    accessTokenSecret: Config.accessTokenSecret
	});

	var TwitterBaseModel = Backbone.Model.extend({
		path: null,

		method: "GET",

		// Define fields for request
		fields: [],

		url: function() {
			return 'https://api.twitter.com/1.1/' + this.path;
		},

		fetch: function(options) {
			console.log("fetch");

			options = options || {};

			_.extend(options, {
				method: this.method,
				url: this.url()
			});

			var authToken = oauth.requestHeader(options);

			// Extend options with graph api parameters
			_.extend(options, {
				headers: {
					'Authorization': authToken
				}
			});
			
			// return oauth.request(options);
			return Backbone.Model.prototype.fetch.call(this, options);
		}
	});

	return TwitterBaseModel;
});