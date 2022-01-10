// Node server

const io = require('socket.io')(https://loneychat.herokuapp.com/, {
    cors: {
      origin: '*',
    }
  });
const users = {};

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