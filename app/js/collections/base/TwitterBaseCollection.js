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

	var BaseCollection = Backbone.Collection.extend({
		path: null,

		method: "GET",

		// Define fields for request
		fields: [],

		// Define limit
		limit: '10',

		// Stores the url for receiving the next page
		// Will be update after each request
		nextUrl: null,

		// Stores the url for receiving the previous page
		prevUrl: null,

		url: function() {
			return 'https://api.twitter.com/1.1/' + this.path;
		},

		fetch: function(options) {
			console.log("fetch");

			var limit = this.limit;
			options = options || {};

			_.extend(options, {
				method: this.method,
				url: this.url(),
				data: {
					limit: limit
				}
			});

			var authToken = oauth.requestHeader(options);

			// Extend options with graph api parameters
			_.extend(options, {
				headers: {
					'Authorization': authToken
				}
			});
			
			// return oauth.request(options);
			return Backbone.Collection.prototype.fetch.call(this, options);
		},

		fetchNext: function(options) {
			var url = this.nextUrl;
			return this.fetch(_.extend(options || {}, {url: url}));
		},

		fetchPrev: function(options) {
			var url = this.prevUrl;
			return this.fetch(_.extend(options || {}, {url: url}));
		},

		setAccessToken: function(accessToken) {
			this.accessToken = accessToken;
		}
	});

	return BaseCollection;
});