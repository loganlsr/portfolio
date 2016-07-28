var express = require('express'),
  requestProxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

var proxyGitHub = function(request, response){
  (
   requestProxy({
     url: 'https://api.github.com/*' + request.params[0],
     headers: { Autorization: 'token ' + process.env.GITHUB_TOKEN }
   })
 )(request, response);
};

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request: ', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function(){
  console.log('Server started on port ' + port + '.');
});
