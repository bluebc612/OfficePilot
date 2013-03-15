define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/main/TimelineCollection',
  'text!templates/main/facebookList.html'
], function($, _, Backbone, Vm, TimelineCollection, TimelineListTemplate){
  var TwitterWidget = Backbone.View.extend({
    el: '.twitter-widget',
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading = false;
      this.timelineCollection = new TimelineCollection();
    },
    render: function () {
      $('.menu li').removeClass('active');
      $('.menu li a[href="#/topics"]').parent().addClass('active');
      
      this.loadResults();
    },
    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.isLoading = true;
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.timelineCollection.fetch({ 
        success: function (timelines) {
          // Once the results are returned lets populate our template
          $(that.el).html(_.template(TimelineListTemplate, {timelines: timelines.models, _:_}));
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
          this.timelineCollection.page += 1; // Load next page
          this.loadResults();
        }
    }
  });
  return TwitterWidget;
});
