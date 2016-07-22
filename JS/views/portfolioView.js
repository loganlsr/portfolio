'use strict';
(function(module){
  var portfolioView = {};

  portfolioView.handleNav = function() {
    $('#top_header button').on('click', function() {
      $('.dropdown-menu').toggle();
    });
  };

  portfolioView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('.read-on').on('click', function(event) {
      event.preventDefault();
      if($(this).text() === 'Show Less') {
        $(this).prev().children('*:nth-of-type(n+2)').hide();
        $(this).text('Read More');
      } else {
        event.preventDefault();
        $(this).prev().children('*:nth-of-type(n+2)').show();
        $(this).text('Show Less');
      }
    });
  };

  portfolioView.renderIndexPage = function() {
    Project.allProjects.forEach(function(a) {
      if($('#category-filter option:contains("' + a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#category-filter-template')));
      };
      if($('#author-filter option:contains("' + a.author + '")').length === 0) {
        $('#author-filter').append(a.toHtml($('#author-filter-template')));
      };
      $('#projects').append(a.toHtml($('#projects-template')));
    });
    portfolioView.handleNav();
    portfolioView.setTeasers();
  };
  module.portfolioView = portfolioView;
})(window);
