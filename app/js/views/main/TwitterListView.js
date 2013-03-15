define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/main/SearchCollection',
  'text!templates/main/list.html'
], function($, _, Backbone, Vm, SearchCollection, SearchListTemplate){
  var TwitterWidget = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading = false;
      this.searchCollection = new SearchCollection();
    },
    render: function () {
      $('.menu li').removeClass('active');
      $('.menu li a[href="#/tweets"]').parent().addClass('active');
      
      this.loadResults();
    },
    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.searchCollection.fetch({ 
        success: function (tweets) {
          // Once the results are returned lets populate our template
          console.log(_.template(SearchListTemplate, {tweets: tweets.models, _:_}));
          $(that.el).html(_.template(SearchListTemplate, {tweets: tweets.models, _:_}));
          // Now we have finished loading set isLoading back to false
          that.isLoading = false;
        }
      });      
    },
    // This will simply listen for scroll events on the current el
    events: {
      'scroll': 'checkScroll'
    },
    checkScroll: function () {
      var triggerPoint = 100; // 100px from the bottom
        if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
          this.searchCollection.page += 1; // Load next page
          this.loadResults();
        }
    }
  });
  return TwitterWidget;
});
