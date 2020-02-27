import '@babel/polyfill';
import RealtimeSurveyClient from "./realtime-survey-client";
import $ from 'jquery';

let socket;


$(function () {
  socket = RealtimeSurveyClient.connectServer();

  $('#voteBtn').click(evt.vote);
  $('#disconnectBtn').click(evt.disconnect);

  // listen on server...
  listenOnServer();
});



// listen on server...
function listenOnServer() {

  // 설문 시작!
  socket.on('broadcast.startSurvey', (survey) => {
    console.log('student > startSurvey', survey);
    RealtimeSurveyClient.renderSurvey('#survey', survey);
  });

  // 투표
  socket.on('broadcast.vote', (id) => {

  });

}


const evt = {

  // [투표하기]btn
  vote: () =>  {

  },

  // [연결끊기]btn
  disconnect: () => {
    socket.close();
  }
};
