'use strict';
var portfolioView = {};

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

portfolioView.setTeasers();
