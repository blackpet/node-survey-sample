import '@babel/polyfill';
import RealtimeSurveyClient from "./realtime-survey-client";
import $ from 'jquery';

let socket;
let surveyData;


$(function() {

  $('#loadBtn').click(evt.loadSurveyItems);
  $('#startBtn').click(evt.startSurvey);
});


// 설문 문항 조회
async function loadSurveyItems() {
  const data = await RealtimeSurveyClient.serveSurvey();
  surveyData = {surveyItems: data, user: 'tutor'};

  console.log('surveyData', surveyData);

  // render template
  RealtimeSurveyClient.renderSurvey('#surveyItems', surveyData);
}

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
    socket = RealtimeSurveyClient.connectServer();
    RealtimeSurveyClient.startSurvey(surveyData);
  },
}
