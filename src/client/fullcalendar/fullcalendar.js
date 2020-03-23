import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '../scss/common.scss'

import '@babel/polyfill';
import $ from 'jquery';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

console.log('fullcalendar samele');

var calendar;

$(function () {
  $('#addEventBtn').click(addEvent);

  var el = document.getElementById('calendar1');
  calendar = new Calendar(el, {
    plugins: [ dayGridPlugin ],
    events: [
      {
        title  : 'event1',
        start  : '2020-03-01'
      },
      {
        title  : 'event2',
        start  : '2020-03-05',
        end    : '2020-03-07'
      },
      {
        title  : 'event3',
        start  : '2020-03-09T12:30:00',
        allDay : false // will make the time show
      }
    ]
  });

  calendar.render();
});


function addEvent(title, date) {
  console.log(title, date);

  var eventData = [
    {
      title: $('#title').val()
      , start: $('#date').val()
    }
  ];
  console.log(eventData);

  calendar.addEvent(eventData);
  calendar.render();
}
