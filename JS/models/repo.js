(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.get('/github/users/loganlsr/repos' +
          '?per_page=10&sort=updated')
          .done(function(data) {
            console.log(data);
            reposObj.allRepos = data;
          }).done(callback);
  };

  reposObj.withTheAttribute = function(myAttr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;
})(window);
