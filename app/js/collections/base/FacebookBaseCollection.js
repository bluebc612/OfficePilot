define([
  	'jquery',
  	'underscore',
  	'backbone',
  	'libs/facebook/config'
], function($, _, Backbone, Config) {
	var BaseCollection = Backbone.Collection.extend({
		path: null,

		// You must provide an access token for most api requests
		accessToken: Config.accessToken,

		// Define fields for request
		fields: [],

		// Define limit
		limit: 10,

		// Stores the url for receiving the next page
		// Will be update after each request
		nextUrl: null,

		// Stores the url for receiving the previous page
		prevUrl: null,

		url: function() {
			return 'https://graph.facebook.com/' + this.path;
		},

		fetch: function(options) {
			var accessToken = this.accessToken,
				fields = this.fields.join(','),
				limit = this.limit;

			options = options || {};

			// Extend options with graph api parameters
			_.extend(options, {
				data: {
					access_token: accessToken,
					fields: fields,
					limit: limit
				}
			});

			return Backbone.Collection.prototype.fetch.call(this, options);
		},

		parse: function(response) {
			// Store paging urls
			if(response.paging) {
				this.nextUrl = response.paging.next || null;
				this.prevUrl = response.paging.previous || null;
			}
			return response.data;
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