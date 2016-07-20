'use strict';

articleView.initAdminPage = function() {
  var template = Handlebars.compile($('#author-template').html());

  Article.numWordsByAuthor().forEach(function(stat) {
    $('.author-stats').append(template(stat));
  });
  $('#portfolio-stats .articles').text(Article.allArticles.length);
  $('#portfolio-stats .words').text(Article.numWordsAll());
};
Article.fetchAll(articleView.initAdminPage);
