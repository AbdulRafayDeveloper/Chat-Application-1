const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

const users = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // socket.on('disconnect', () => {
    //   console.log('A user disconnected');
    // });

    socket.on('new user', (name) => {
        console.log('New User: ', name);
        users[socket.id] = name;
        socket.broadcast.emit('new_user_join', name);
    });

    socket.on('send message', (message) => {
        console.log('Received message:', message);
        socket.broadcast.emit('receive message', {message:message , name:users[socket.id]});
    });
});

http.listen(8000, () => {
    console.log('Server started on port 8000');
});