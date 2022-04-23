const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/controller', (req, res) => {
  res.sendFile(__dirname + '/controller.html');
});

app.get('/outoftime.mp3', (req,res) => {
  res.sendFile(__dirname + '/outoftime.mp3');
});

app.get('/warning.mp3', (req,res) => {
  res.sendFile(__dirname + '/warning.mp3');
});

io.on('connection', socket => {
  console.log('user connected:' + socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
  });

  socket.on('start', () => {
    socket.broadcast.emit('start');
  });
  socket.on('shot', () => {
    socket.broadcast.emit('shot');
  });
  socket.on('reset', () => {
    socket.broadcast.emit('reset');
  });
  socket.on('pause', () => {
    socket.broadcast.emit('pause');
  });
  socket.on('resume', () => {
    socket.broadcast.emit('resume');
  });
  socket.on('extend', () => {
    socket.broadcast.emit('extend');
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});