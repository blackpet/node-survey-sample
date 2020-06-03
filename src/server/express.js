import express from 'express'
import http from 'http'
import * as _ from 'lodash'

const app = express();

const port = process.env.PORT || 3001;

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

let users = {};
let survey;

// middleware
io.use((socket, next) => {
  let userId = socket.handshake.query.userId;

  if (!!userId) {
    users[userId] = socket.id;
    console.log(users);

    return next();
  }

  return next(new Error('authentication error'));
});


const serverHandler = (req, res) => {
  console.log('serverHandler', 'connected');
};
server.listen(port, serverHandler);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // [student] 수강생의 접속을 알리자!
  io.sockets.emit('broadcast.connectUser', findUserIdBySocketId(socket.id));

  // 접속한 수강생에게 설문을 전송하자!
  io.to(socket.id).emit('broadcast.startSurvey', survey);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);

    // disconnect user
    evt.disconnectUser(socket.id);
  });

  // [tutor] 모든 수강생에 설문 시작 알림
  socket.on('startSurvey', (_survey) => {
    console.log('startSurvey1231231231');
    survey = _survey;
    // start survey by tutor, broadcast to all students
    survey.user = 'student';

    // [tutor]를 제외한 모든 수강생만 대상이다! (cf: io.sockets.emit() )
    socket.broadcast.emit('broadcast.startSurvey', survey);
  });

  socket.on('vote', (voteId) => {
    console.log(`${findUserIdBySocketId(socket.id)} vote: ${voteId}`);

    const voteItem = surveyService.increaseVoteCount(voteId);

    // 투표 결과를 위해 다시 설문 데이터를 내려주자!
    io.sockets.emit('broadcast.updateVote', survey.surveyItems, voteItem);
  });
});

// events....
const evt = {
  disconnectUser: (socketId) => {
    const userId = findUserIdBySocketId(socketId);
    delete users[userId];

    io.sockets.emit('broadcast.disconnectUser', userId);
  }
};

function findUserIdBySocketId(socketId) {
  return _.invert(users)[socketId];
}

const surveyService = {
  increaseVoteCount: (voteId) => {
    const item = _.find(survey.surveyItems, {id: parseInt(voteId)});
    ++item.vote;
    console.log(survey);

    return item;
  },

  decreaseVoteCount: (voteId) => {
    const item = _.find(survey.surveyItems, {id: voteId});
    ++item.vote;

    return item;
  }
};
