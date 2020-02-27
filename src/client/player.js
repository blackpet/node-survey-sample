import $ from 'jquery';

/**
 * imgtech player sample script
 */
const videoUrl = 'http://eduvod.nongshim.com/ramyun.mp4';
const src = {
  src: videoUrl
  // , virtualTime: {start: 0, end: 60} // 미리보기용 재생가능 구간: 60초
  // , disableSeekable: true // disabled seeking
  // , autoContinueTime: 30 // 이어보기: 30초 부터
};




// player callbacks...
const callback = {
  watchTime: function (e) {
    // 페이지 이동 시(벗어날 시) 에도 callback 이 발생한다! (a.beforeUnload == true)
    const param = {
      p_duration: this.p.duration() // 영상 총 시간
      , p_currentTime: Math.round(e.currentTime) // 현재 재생 위치
      , p_lnTime: Math.round(e.data.playingTime.value) // 학습시간
      , p_lnDepth: Math.round(e.data.playingTime.depth) // interval 간격 시간 (이전 callback ~ 현재 callback 시간 간격)
      , p_lnStsCd: e.ended || e.beforeUnload ? '03' : '02' // 03:학습종료 / 02:자동저장
    };
    // 진도 갱신하자!
    updateVodProgress(param);
  }

  , playerEvent: function (e) {
    // 회원권 미 구매자에게 1분 미리보기 종료 시 구매 촉구를 위한 alert을 띄우자!
    if (false) {
      if (!!e.data && !!e.data.duration && e.data.duration == e.data.currentTime) {
        alert({msg: '더 보실려면 회원권을 구입하셔야 합니다.', ok: buyMembership});
      }
    }

    const Media = window.getDframework().module('imgtech.media.Media');
    // 최초 학습 시작 시 "학습시작" 진도체크!
    if (e.type != Media.EVENT.ON_AFTER_ONCE_PLAY) return;

    const param = {
      p_lnStsCd: '01' // 01:학습시작
    };

    // 진도 갱신하자!
    updateVodProgress(param);
  }
};

// 동영상 진도 저장
function updateVodProgress (_param) {
  const courParam = {
    p_ctntSeq: '${BOX.map.ctntInfo.O_CTNT_SEQ}'
    , p_opn_yy: '${BOX.map.memberShipInfo.D_OPN_YY}'
    , p_cour: '${BOX.map.memberShipInfo.I_COUR}'
    , p_sim_num: '${BOX.map.memberShipInfo.O_SIM_NUM}'
    , p_tk_lect: '${BOX.map.memberShipInfo.O_TK_LECT}'
    , p_ctnt_gubun: 'video'
  };
  const data = $.extend({}, courParam, _param);

  console.log('진도체크', data);
  return;

  $.ajax({
    type: "POST"
    , url: "/platformWeb/kbiTubeContent.do?cmd=updateKbiTubeProgress"
    , data: data
    , dataType: "json"
    , async: false
    , contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
      // 진도체크 callback은 할게 없다!
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
    }
  });
};


// public member
const player = {
  init(elId) {
    console.log('player.init()');
    const _player = window.createMediaPlayer(
      elId || '#mediaplayer'
      , src
      , {
        width: 764
        , height: 470
        , autoplay: true

        , module: {
          watchtime: {
            className: 'imgtech.media.module.WatchTime'
            , depthSeconds: 10
            , playingTime: true
            , callback: callback.watchTime
          }
        }

        , event: {
          callback: callback.playerEvent
        }
      }
    );

    return _player;
  },
};

export default player;

(function () {
  player.init();
})();

