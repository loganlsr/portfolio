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
  var $newProject = $('project.template').clone();
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').html(parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' Days Ago');
  $newProject.find('address').html(this.author);
  $newProject.find('address a').attr('href', this.projectUrl);
  $newProject.find('h1').html(this.title);
  $newProject.find('h1').append('<h6>' + this.category + '</h6>');
  $newProject.find('section.article-body').html(this.body);
  $newProject.removeClass('template');
  return $newProject;
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
