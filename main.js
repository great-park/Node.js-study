const http = require('http');

users = ['Kim', "Lee", "Park"];

let server = http.createServer(function(request, response){
  
  if(request.url === '/'){
    response.end('<h1>Welcome!</h1>');
  }else if(request.url === '/users'){
    response.end('<h1>' + users + '</h1>');
  }else{
    response.end('<h1>Page Not Available</h1>');
  }
});
server.listen(3001);