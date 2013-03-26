define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function($, _, Backbone, Vm) {
  var BaseView = Backbone.View.extend({
    el: '.twitter-widget',

    collection: null,

    initialize: function () {
      this.isLoading = false;
    },

    render: function () {
      $(this.el).empty();
      $('.menu li').removeClass('active');
      $('.menu li a[href="#/topics"]').parent().addClass('active');
      
      this.loadResults();
    },

    events: {
      'scroll': 'checkScroll'
    },

    checkScroll: function () {
      var triggerPoint = 100; // 100px from the bottom
        if( !this.isLoading && this.el.scrollTop + this.el.clientHeight + triggerPoint > this.el.scrollHeight ) {
          this.collection.page += 1; // Load next page
          this.loadResults();
        }
    }
  });

  return BaseView;
});
