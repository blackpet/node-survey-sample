import express from 'express'
import http from 'http'

const app = express();

const port = 3001;

app.use(express.static('dist'));
app.use('/static', express.static('static'));



/**
 * routes
 */
app.get('/api', (req, res) => res.send('Hello node!'));



/**
 * socket.io server configuration
 */
const server = http.createServer(app);
const io = require('socket.io')(server, {path: '/socket.io'});

const serverHandler = (req, res) => {
  console.log('serverHandler', 'connected');
};
server.listen(port, serverHandler);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('startSurvey', (survey) => {
    // start survey by tutor, broadcast to all students
    survey.user = 'student';
    socket.broadcast.emit('broadcast.startSurvey', survey);
  });
});




