'use strict';
(function(module){
  var portfolioController = {};

  portfolioController.reveal = function(){
    $('.tab-content').hide();
    $('#portfolio').fadeIn();
  };

  module.portfolioController = portfolioController;
})(window);
