define([
  'jquery',
  'underscore',
  'backbone',
  'libs/twitter/config',
  'OAuth'
], function($, _, Backbone, Config, OAuth) {
	var BaseCollection = Backbone.Collection.extend({
		makeOAuthHeader: function() {
			var accessor = {
				consumerSecret: Config.consumerSecret, 
				tokenSecret: Config.accessTokenSecret
			};
   			var message = {
   				method: 'GET', 
   				action: this.url(),
   				parameters: {
  					oauth_signature_method: 'HMAC-SHA1', 
   					oauth_version: '1.0',
   					oauth_consumer_key: Config.consumerKey,
   					oauth_token: Config.accessToken
   				}
			};

			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);
			return OAuth.getAuthorizationHeader("", message.parameters);
		},

		path: null,

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
			var oauthHeader = this.makeOAuthHeader(),
				fields = this.fields.join(','),
				limit = this.limit;

			options = options || {};

			// Extend options with graph api parameters
			_.extend(options, {
				headers: {
					Authorization: oauthHeader
				},
				data: {
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