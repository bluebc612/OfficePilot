define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, SidebarView, homeTemplate){

  var HomeView = Backbone.View.extend({
    // el: $("#page"),
    el: '.page',

    render: function(){
      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');

      $(this.el).html(_.template(homeTemplate, {}));

      var sidebarView = new SidebarView();
      sidebarView.render();
    }

  });

  return HomeView;
  
});
