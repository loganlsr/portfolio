'use strict';
(function(module){
  var portfolioView = {};

  portfolioView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('project').hide();
        $('project[data-author="' + $(this).val() + '"]').fadeIn();
      } else {
        $('project').fadeIn();
        $('project.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('project').hide();
        $('project[data-category="' + $(this).val() + '"]').fadeIn();
      } else {
        $('project').fadeIn();
        $('project.template').hide();
      }
      $('#author-filter').val('');
    });
  };

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
    portfolioView.handleAuthorFilter();
    portfolioView.handleCategoryFilter();
    portfolioView.handleNav();
    portfolioView.setTeasers();
  };
  module.portfolioView = portfolioView;
  Project.fetchAll(portfolioView.renderIndexPage);
})(window);
