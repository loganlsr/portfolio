(function(module) {
  var repoView = {};
  var repoCompiler = Handlebars.compile($('#repo-template').text());  // Finish the Handlebars method here!

  repoView.renderRepos = function() {

    $('#github ul').empty().append(
      reposObj.allRepos.filter(function(repo) {
        return repo.fork === false;
      })
      .map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);
  module.repoView = repoView;
})(window);
