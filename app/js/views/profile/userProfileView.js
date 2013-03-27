define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/TwitterBaseView',
  'models/profile/UserProfileModel',
  'text!templates/profile/userProfile.html'
], function($, _, Backbone, TwitterBaseView, UserProfileModel, userProifleTemplate) {
  var UserPofile = TwitterBaseView.extend({
    initialize: function () {
      this.isLoading = false;
      this.profile = new UserProfileModel();
    },

    loadResults: function () {
      var that = this;

      this.isLoading = true;
      this.profile.fetch({
        success: function (info) {
          $(that.el).html(_.template(userProifleTemplate, {profile: info.attributes, _:_}));
          that.isLoading = false;
        }
      });
    },
  });

  return UserPofile;
});
