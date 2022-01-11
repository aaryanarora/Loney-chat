// Node server
var express = require("express");
var app = express();
var http = require('http').Server(app); 
// var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });
  app.use(express.static('public'));
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
 });  
const users = {};
http.listen(8080); //listen to port 8080

// function handler (req, res) { //create server
//     fs.readFile(__dirname + '/index.html', function(err, data) { //read file index.html in public folder
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
//         return res.end("404 Not Found");
//       }
//       res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
//       res.write(data); //write data from index.html
//       return res.end();
//     });
//   }
io.on('connection',socket=>{

    socket.on('new-user-joined', name=>{ //socket.on used for various things to happen in client side and all the events name like 'new-user-joined' are custom

        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name); //broadcast to everyone except the person        
    });

    socket.on('send', message =>{

        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{ //disconnect is predefined event when someone leave the server

        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];   
    });
})