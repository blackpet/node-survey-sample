import io from 'socket.io-client';
import $ from 'jquery';
require('jsrender')($); // load JsRender as jQuery plugin


let socket;

const surveyItemsTmpl = `
  <ol>
    {{for surveyItems}}
    <li>
      {{if ~root.user == 'student'}}
      <span><input type="radio" name="id" value="{{:id}}"></span>
      {{/if}}
      <label for="survey{{:id}}">{{>subject}}</label>
      <div class="result">(<span id="result{{:id}}">-</span>)</div>
    </li>
    {{/for}}
  </ol>
`;

const RealtimeSurveyClient = {
  serveSurvey: function() {
    return fetch('/html/realtime-survey/survey-items.json').then((res) => {
      if (res.ok) {
        const data = res.json();
        return data;
      }
      return null; // error
    });
  },

  connectServer: () => {
    socket = io('http://localhost:3001');
    console.log('client connected!!');
    listenOnServer();

    return socket;
  },

  startSurvey: (survey) => {
    socket.emit('startSurvey', survey);
  },


  renderSurvey(el, data) {
    const tmpl = $.templates(surveyItemsTmpl);
    $(el).html(tmpl.render(data));
  }
};

// listen on server
function listenOnServer() {

  socket.on('broadcast.vote', (data) => {
    console.log(data);
  });

}


export default RealtimeSurveyClient;

