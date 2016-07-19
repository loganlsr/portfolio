'use strict';

var projects = [];

function Project(opts) {
  this.author = opts.author;
  this.title = opts.title;
  this.category = opts.category;
  this.projectUrl = opts.projectUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.prototype.toHtml = function(){
  var source = $('#blog-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' Days Ago';
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);
};

projectData.sort(function(a, b){
  return(new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele){
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});

function Filter (opts) {
  this.author = opts.author;
  this.category = opts.category;
};
