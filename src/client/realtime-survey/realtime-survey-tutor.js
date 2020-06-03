import '@babel/polyfill';
import RealtimeSurveyClient from "./realtime-survey-client";
import $ from 'jquery';

let socket;
let surveyData;
const userId = 'tutor01';


$(function() {

  $('#loadBtn').click(evt.loadSurveyItems);
  $('#startBtn').click(evt.startSurvey);
  $('#disconnectBtn').click(evt.disconnect);

  $('#testIncrease').click(test.increase);
  $('#testDecrease').click(test.decrease);
  $('#testIncrease1').click(test.increase1);
  $('#testDecrease1').click(test.decrease1);
});

const test = {
  increase: () => {
    var w = $('.test .graph div').width();
    console.log('increase', w);
    $('.test .graph div').css('width', w + 20);
  },
  decrease: () => {
    var w = $('.test .graph div').width();
    console.log('decrease', w);
    $('.test .graph div').css('width', w - 20);
  },
  increase1: () => {
    var w = $('#survey1 .graph div').width();
    console.log('increase', w);
    $('#survey1 .graph div').css('width', w + 20);
  },
  decrease1: () => {
    var w = $('#survey1 .graph div').width();
    console.log('decrease', w);
    $('#survey1 .graph div').css('width', w - 20);
  }
};

// listen on server...
function listenOnServer() {

  // 수강생 접속
  socket.on('broadcast.connectUser', broadcast.connectUser);

  // 수강생 접속 종료
  socket.on('broadcast.disconnectUser', broadcast.disconnectUser);

}

const broadcast = {

  connectUser: (userId) => {
    console.log('broadcast.connectUser!!!', userId);
    $(`.connect-users .${userId}`).addClass('on');
  },

  disconnectUser: (userId) => {
    console.log('broadcast.disconnectUser!!!', userId);
    $(`.connect-users .${userId}`).removeClass('on');
  }
};

// events...
const evt = {

  // [설문 조회]btn
  loadSurveyItems: async () => {
    const data = await RealtimeSurveyClient.serveSurvey();
    surveyData = {surveyItems: data, user: 'tutor'};

    console.log('surveyData', surveyData);

    // render template
    RealtimeSurveyClient.renderSurvey('#surveyItems', surveyData);
  },

  // [설문 시작]btn
  startSurvey: () => {
    socket = RealtimeSurveyClient.connectServer(userId);

    // listen on server...
    listenOnServer();

    // 설문을 수강생에 중계하자!
    RealtimeSurveyClient.startSurvey(surveyData);
  },

  disconnect: () => {
    socket.close();
  }
};
