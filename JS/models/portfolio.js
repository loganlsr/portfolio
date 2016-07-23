'use strict';
(function(module) {

  function Project (opts) {
    for(var key in opts) {
      this[key] = opts[key];
    }
  }

  Project.allProjects = [];

  Project.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    // this.body = marked(this.body);
    return template(this);
  };

  Project.loadAll = function(dataWePassIn) {
    Project.allProjects = dataWePassIn.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(nextFunction) {
    if (localStorage.projectObjects) {
      $.ajax({
        type: 'HEAD',
        url: '/data/projectObjects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll(nextFunction);
          } else {
            Project.loadAll(JSON.parse(localStorage.projectObjects));
            nextFunction();
          }
        }
      });
    } else {
      Project.getAll(nextFunction);
    }
  };

  Project.getAll = function(nextFunction) {
    $.getJSON('/data/projectObjects.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.projectObjects = JSON.stringify(responseData);
      nextFunction();
    });
  };

  Project.numWordsAll = function() {
    return Project.allProjects.map(function(project) {
      return project.body.match(/\w+/g).length;
    })
    .reduce(function(a,b) {
      var totalWords = a + b;
      return totalWords;
    });
  };

  Project.allAuthors = function() {
    return Project.allProjects.map(function(project) {
      return project.author;
    })
    .reduce(function(uniqueAuthorArray, author){
      if (uniqueAuthorArray.indexOf(author) < 0) uniqueAuthorArray.push(author);
      return uniqueAuthorArray;
    },[]);
  };

  Project.numWordsByAuthor = function() {
    return Project.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Project.allProjects.filter(function(project){
          return project.author === author;
        }).map(function(project){
          var body = project.body;
          return project.body.match(/\w+/g).length;
        }).reduce(function(countA, countB){
          return countA + countB;
        })
      };
    });
  };

  module.Project = Project;

})(window);
