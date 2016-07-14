'use strict';
var portfolioView = {};

portfolioView.setTeasers = function() {
  $('.article-body *:nth-of-type').hide();
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if($(this).text() === 'Show Less') {
      $(this).prev().children('*:nth-of-type').hide();
      $(this).text('Read More');
    } else {
      event.preventDefault();
      event.stopPropagation();
      $(this).prev().children().show();
      $(this).text('Show Less');
    }
  });
};

portfolioView.setTeasers();
