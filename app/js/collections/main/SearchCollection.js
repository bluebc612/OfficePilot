// var Twit = require('libs/twitter/twitter');

// var SearchCollection = module.exports = function(config) { 
//   this.twit = new Twit(config);
// };

define([
  'jquery',
  'underscore',
  'backbone',
  'libs/twitter/config'
], function($, _, Backbone, Config) {
  var Tweets = Backbone.Collection.extend({
    url: function () {
      return 'https://api.twitter.com/1.1/search/tweets.json?q=' + this.query + '&page=' + this.page + '&callback=?'
    },

    sync: function(method, model, options){
      options || (options = {});
      options.url = model.url;

      $.ajax({
        headers: {
          "type": "POST",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Accept": "application/json",
          "Authorization ": "Basic xvz1evFS4wEEPTGEFPHBog"
        },
        url: 'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
        type: "POST",
        dataType: 'jsonp',
        success: function (data) { 
          console.log(data); 

          options.headers = {

          };

          return Backbone.sync.call(method, model, options);
        },
        error: function(e) {
          console.log(e);
        }
      });
    },

    // Because twitter doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
      console.log(resp.results);
      return resp.results;
    },
    page: 1,
    query: 'backbone'
  });

  return Tweets;
});