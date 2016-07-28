(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    // $.ajax({
    //   url: 'https://api.github.com/users/loganlsr/repos',
    //   type: 'GET',
    //   headers: {
    //     'Authorization': 'token ' + token,
    //   },
    //   success: function(data, message, xhr) {
    //     data.forEach(function(cur){
    //       (reposObj.allRepos).push(cur);
    //     });
    //     callback();
    //   }
    // });
    $.get('/github/users/loganlsr/repos' +
          '?per_page=10&sort=updated')
          .done(function(data) {
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
