import '@babel/polyfill';
import RealtimeSurveyClient from "./realtime-survey-client";
import $ from 'jquery';

let socket;
let mode = 'vote'; // vote: 투표모드 | result: 결과모드
let userId;
let survey;


$(function () {

  $('#connectBtn').click(evt.connect);
  $('#voteBtn').click(evt.vote);
  $('#disconnectBtn').click(evt.disconnect);
});



// listen on server...
function listenOnServer() {

  // 설문 시작!
  socket.on('broadcast.startSurvey', (_survey) => {
    survey = _survey;
    console.log('student > startSurvey', _survey);

    survey.mode = mode;
    RealtimeSurveyClient.renderSurvey('#survey', survey);
  });

  // 투표결과 갱신
  socket.on('broadcast.updateVote', (items, voteItem) => {
    survey.surveyItems = items;
    console.log('student!! updateVote');
  });

}

// events...
const evt = {

  // 서버에 접속!
  connect: () => {
    userId = $('#userId').val();

    // validation
    if (!userId) {
      alert('userId를 설정해 주세요');
      return;
    }

    socket = RealtimeSurveyClient.connectServer(userId);

    // listen on server...
    listenOnServer();

    // swap connect state
    swapConnectState(true);
  },

  // [투표하기]btn
  vote: () =>  {
    const frm = document.surveyFrm;

    // validation
    if (!frm.surveyId.value) {
      alert('투표 항목을 선택해 주세요');
      return;
    }

    // 설문항목 서버로 전송!
    // TODO DB 저장
    RealtimeSurveyClient.vote(frm.surveyId.value);

    // 결과 화면으로 전환!
    mode = survey.mode = 'result';
    changeSurveyToResult();
  },

  // [연결끊기]btn
  disconnect: () => {
    userId = null;
    socket.close();

    // swap connect state
    swapConnectState(false);
  }
};

// swap connect state
function swapConnectState(state) {

  // swap connect button display
  $('#connectBtn, #disconnectBtn').toggle();

  $('#userId').prop('disabled', state);
}

// 결과보기 화면으로 전환!
function changeSurveyToResult() {
  RealtimeSurveyClient.renderSurvey('#survey', survey);

  $('#voteBtn').addClass('hidden');
}
