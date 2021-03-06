import './scss/facility.scss';

import '@babel/polyfill';
import $ from 'jquery';
import moment from 'moment';
import * as _ from 'lodash';

require('jsrender')($); // load JsRender as jQuery plugin

$(document).ready(function () {
  // attach events
  // [시설 조회하기]btn
  $('#searchBtn').click(evt.searchFacility);
  // [예약 가능한 시설 확인1]btn
  $('#reservableFaciBtn').click(evt.findReservableFaci);
  // [예약 가능한 시설 확인2]btn
  $('#reservableFaciBtn2').click(evt.findReservableFaci2);

  // 반복 속성은 default:안함 이다!
  $('#repeatEndDt').prop('disabled', true);
  $(':radio[name=repeat]').click(evt.toggleRepeatState);
});

const evt = {

  // [시설 조회하기]btn click
  searchFacility: () => {
    // TODO validation!!

    const startDt = moment($('#startYmd').val());
    const endDt = moment($('#endYmd').val());

    // 시설과 예약 데이터를 조회하고 화면에 출력하자!
    init(startDt, endDt);
  },

  // [예약 가능한 시설 확인]btn click
  findReservableFaci: () => {
    // TODO validation!!
    /**
     * 예약 신청 날짜는 조회날짜의 범위 안에 있어야 한다!
     * @type {{startYmd: (jQuery|string|undefined), endHm: (jQuery|string|undefined), endYmd: (jQuery|string|undefined), startHm: (jQuery|string|undefined)}}
     */

    // 예약 신청 기간
    var appl = {
      startYmd: $('#resvStartYmd').val()
      , startHm: $('#resvStartHm').val()
      , endYmd: $('#resvEndYmd').val()
      , endHm: $('#resvEndHm').val()
    };

    /**
     * 시설별 loop
     *    예약현황 loop
     *        if 예약현황의 기간과 예약신청의 기간을 비교한다
     */
    // var 예약가능여부 = true;
    // for (시설 of 시설들) {
    //   for (예약 of 시설.예약들) {
    //     if (신청.시작일자 <= 예약.종료일자 && 신청.종료일자 >= 예약.시작일자) {
    //       예약가능여부 = false;
    //       break;
    //     }
    //   }
    //   if(!예약가능여부) {
    //     시설.set비활성화;
    //     예약가능여부 = true;
    //   }
    // }


    // 예약 가능 여부
    var isCanRes = true;

    // 일단! 모든 시설건은 예약 가능상태로 초기화 한 후 시작하자!
    $(':checkbox[name=faciId]').prop('disabled', false);

    // 시설을 돌면서~
    for (var faci of faciList) {
      var faciId = faci.faciId;
      // 시설별 예약현황을 돌면서 기 예약이 잡혀있는지 여부를 확인하자!
      for (var res of faci.reservations) {
        if (((appl.startYmd+appl.startHm) <= (res.endYmd+res.endHm)) && ((appl.endYmd+appl.endHm) >= (res.startYmd+res.startHm))) {
          isCanRes = false;
          break;
        }
      }
      if(!isCanRes) {
        // 예약불가한 시설이다! checkbox를 비활성화 하자!
        $(':checkbox[name=faciId][value=' + faciId + ']').prop('disabled', true);
        isCanRes = true;
      }
    }


    console.log('evt.reseve!!!'
      , $('#resvStartYmd').val()
      , $('#resvStartHm').val()
      , $('#resvEndYmd').val()
      , $('#resvEndHm').val()
    );
  },

  // [예약 가능한 시설 확인2]btn click
  findReservableFaci2: () => {

    // 예약 신청 기간
    var appl = {
      startYmd: $('#resvStartYmd').val()
      , startHm: $('#resvStartHm').val()
      , endYmd: $('#resvEndYmd').val()
      , endHm: $('#resvEndHm').val()
    };

    // 기예약건 data
    var alreadyReserv = [];
    // 예약 가능 여부
    var isCanRes = true;

    // 시설을 돌면서~
    for (var faci of faciList) {
      var faciId = faci.faciId;

      // 시설별 예약현황을 돌면서 기 예약이 잡혀있는지 여부를 확인하자!
      for (var res of faci.reservations) {
        if (((appl.startYmd+appl.startHm) <= (res.endYmd+res.endHm)) && ((appl.endYmd+appl.endHm) >= (res.startYmd+res.startHm))) {
          isCanRes = false;
          // 예약불가한 시설이다! 예약 data 를 저장해놓자!
          var faciInfo = {
            faciId: faci.faciId,
            location: faci.location,
            name: faci.name
          };
          alreadyReserv.push( $.extend({}, faciInfo, res) );
        }
      }

      // 다음 시설도 [예약 가능]에서부터 체크 시작하자!
      isCanRes = true;
    }

    // 기 예약건이 있으면 화면에 출력하자!
    if (alreadyReserv.length > 0) {
      $('#description').text(JSON.stringify(alreadyReserv));
    }

  }, // end of findReservableFaci2()

  // [전체선택]chk click 시 시설 check toggle
  toggleCheckAll: (e) => {
    $('input[name=faciId]').prop('checked', e.target.checked);
  },

  // 시설별 checkbox click 시 [전체선택]chk 상태 변경
  toggleFaciIdCheck: (e) => {
    $('#checkAll').prop('checked',
      $('input[name=faciId]:enabled').length == $('input[name=faciId]:checked').length);
  },

  toggleRepeatState: (e) => {
    // disabled 인 모든 input 활성화 시키고 시작하자!
    $(':disabled').prop('disabled', false);

    // 반복:안함
    if (e.currentTarget.value === '-') {
      // 반복 종료일 disabled
      $('#repeatEndDt').prop('disabled', true);
    }

    // 반복:매일
    else {
      // 매일반복인 경우 종료일 날짜는 무시!
      $('#resvEndYmd').prop('disabled', true);
    }
  }
};

// Service
const facilityService = {
  // 시설정보 조회
  loadFacilities: () => {
    return fetch('/data/facility/facilities.json').then((res) => {
      if (res.ok) {
        const data = res.json();
        return data;
      }
      return null; // error
    });
  },

  // 시설정보 조회
  loadReservations: () => {
    return fetch('/data/facility/reservations.json').then((res) => {
      if (res.ok) {
        const data = res.json();
        return data;
      }
      return null; // error
    });
  },

  // 화면에 출력하자!
  renderFacilities: (data, startDt, endDt) => {
    // 날짜 데이터를 생성하자!
    let days = [];
    const diff = endDt.diff(startDt, 'days') + 1;
    const _startDt = startDt.add(-1, 'days');
    _.map(new Array(diff), function (el, i) {
      days.push({
        ymd: _startDt.add(1, 'days').format('YYYYMMDD'),
        str: _startDt.format('MM/DD')
      });
    });

    // header 를 생성하자!
    const tmplHeader = $.templates('#tmplFacilityHeader');
    $('#facilitiesHeader').html(tmplHeader.render({days: days}));

    // header 에 있는 [전체선택]chk event 적용!
    $('#checkAll').change(evt.toggleCheckAll);

    // data 를 생성하자!
    const tmpl = $.templates('#tmplFacility');
    const _data = {
      facis: data,
      days: days
    };

    $('#facilities').html(tmpl.render(_data));

    // 시설별 checkbox event 적용!
    $('input[name=faciId]').change(evt.toggleFaciIdCheck);
  },

  // 예약 신청 하고자 하는 날짜+시간에 예약이 가능한지 여부 (비어 있는지 여부)
  availableReservation(stYmd, stHm, endYmd, endHm, faciId) {

  }
};

let faciList;

function init(startDt, endDt) {
  // 시설정보 loading
  facilityService.loadFacilities().then((res) => {
    faciList = res;

    // 시설 예약정보 loading
    facilityService.loadReservations().then((res) => {
      const _reservs = res;

      // 시설별 예약정보를 할당하자!
      _.chain(_reservs)
        .groupBy('faciId') // id로 group by 하고~
        .map((value, key) => {

          // faciId 별 .reservations 에 예약정보를 할당하자!
          const f = _.find(faciList, function(o) { return o.faciId == key; });
          f.reservations = value;
        })
        .value();

      console.log('final data', faciList);

      // render facility
      facilityService.renderFacilities(faciList, startDt, endDt);
    });
  });
}



(function () {

})();



