(function(){
    'use strict';
    
    var SKIN_NAME = "firstbrainvod";
    var IS_DEBUG = "false"==="true" ? true : false;
    
    window.createMediaPlayer = function(id, source, params, callback) {
        return createOriginalMediaPlayer(id, source, params, callback);
    };
    
    function cp(a, b){
        for(var n in b){
            if(typeof(b[n])=='object'){
                if(typeof(a[n])!=='object')
                    a[n] = {};
                cp(a[n], b[n]);
            }else{
                a[n] = b[n];
            }
        }
    }
    
    function createOriginalMediaPlayer(id, source, params, callback){
        var D = window.getDframework(),
            Media = D.module('imgtech.media.Media'),
            E = Media.EVENT,
            attr = {
                    "debug": {
                        "use": IS_DEBUG,
                        "flash": false,
                        "startType": "log",
                        "displaySource": false,
                        "displayType": false,
                        "displayClassName": 1,
                        "disable": [
                            E.CLICK_EVENT,
                            E.SUBTITLE_EVENT,
                            E.WAITTING,
                            E.DURATION_CHANGE,
                            E.CURRENT_TIME_CHANGE,
                            E.WATCH_TIME_CHANGE,
                            E.BUFFERING_CHANGE,
                            E.SUBTITLE_EVENT,
                            E.RESIZE_WINDOW,
                            E.SIZE_CHANGE
                        ],
                        "special": [
                            E.VOLUME_CHANGE,
                            //E.SEEKTO_MEDIA,
                            //E.CAN_PLAY,
                            //E.WAITTING,
                            //E.SIZE_CHANGE,
                            //E.FULLSCREEN_CHANGE,
                            //E.CLICK_EVENT
                        ],
                        "element": "#zonehtml5mediaplayer_debuger",
                        "url": ""
                    },
                    "playerType": "",
                    "deviceClass": "",
                    "skin": SKIN_NAME,
                    "resourceText": getHtmlResource(),
                    //"imagePath": MEDIAPLAYER_IMAGE_PATH,
                    //"css": MEDIAPLAYER_CSS_PATH,
                    "src": source,
                    "disableUi": false,
                    "width": "100%",
                    "height": "100%",
                    "autoplay": true,
                    "use_rates": [
                        {
                            "value": 0.5,
                            "context": "0.5\ubc30\uc18d",
                            "cvalue": "0.5\ubc30\uc18d"
                        },
                        {
                            "value": 0.6,
                            "context": "0.6\ubc30\uc18d",
                            "cvalue": "0.6\ubc30\uc18d"
                        },
                        {
                            "value": 0.7,
                            "context": "0.7\ubc30\uc18d",
                            "cvalue": "0.7\ubc30\uc18d"
                        },
                        {
                            "value": 0.8,
                            "context": "0.8\ubc30\uc18d",
                            "cvalue": "0.8\ubc30\uc18d"
                        },
                        {
                            "value": 0.9,
                            "context": "0.9\ubc30\uc18d",
                            "cvalue": "0.9\ubc30\uc18d"
                        },
                        {
                            "value": 1,
                            "context": "1.0\ubc30\uc18d",
                            "cvalue": "1.0\ubc30\uc18d"
                        },
                        {
                            "value": 1.1,
                            "context": "1.1\ubc30\uc18d",
                            "cvalue": "1.1\ubc30\uc18d"
                        },
                        {
                            "value": 1.2,
                            "context": "1.2\ubc30\uc18d",
                            "cvalue": "1.2\ubc30\uc18d"
                        },
                        {
                            "value": 1.3,
                            "context": "1.3\ubc30\uc18d",
                            "cvalue": "1.3\ubc30\uc18d"
                        },
                        {
                            "value": 1.4,
                            "context": "1.4\ubc30\uc18d",
                            "cvalue": "1.4\ubc30\uc18d"
                        },
                        {
                            "value": 1.5,
                            "context": "1.5\ubc30\uc18d",
                            "cvalue": "1.5\ubc30\uc18d"
                        },
                        {
                            "value": 1.6,
                            "context": "1.6\ubc30\uc18d",
                            "cvalue": "1.6\ubc30\uc18d"
                        },
                        {
                            "value": 1.7,
                            "context": "1.7\ubc30\uc18d",
                            "cvalue": "1.7\ubc30\uc18d"
                        },
                        {
                            "value": 1.8,
                            "context": "1.8\ubc30\uc18d",
                            "cvalue": "1.8\ubc30\uc18d"
                        },
                        {
                            "value": 1.9,
                            "context": "1.9\ubc30\uc18d",
                            "cvalue": "1.9\ubc30\uc18d"
                        },
                        {
                            "value": 2,
                            "context": "2.0\ubc30\uc18d",
                            "cvalue": "2.0\ubc30\uc18d"
                        }
                    ],
                    "watchTime": 1,
                    "module": {
                        "layout": {
                            "controlAutoHide": 2.5,
                            "controlAutoHidePause": false,
                            "controlAutoHideFirst": true,
                            "controlAutoHideOver": false,
                            "separateControlNormal": true,
                            "separateControlFs": false,
                            "alwaysControlNormal": true,
                            "alwaysControlFs": false,
                            "useOsdPlayBtn": false,
                            "isTouchControl": function(){ return getDframework().b.isMobile || this.p.module('app').isMobileApp(); }
                        },
                        "volume": {
                            "disableVolume": [
                                "iOS", "android"
                            ],
                            "disableMouseOver": true
                        },
                        "subtitle": {
                            "defaultValue": "\uc790\ub9c9",
                            "autohide": true,
                            "listOffsetY": 10,
                            "onlyText": true
                        },
                        "quality": {
                            "defaultValue": "\ud488\uc9c8",
                            "autohide": true,
                            "listOffsetY": 10
                        },
                        "rate": {},
                        "key": {
                            "volumeStep": 10,
                            "seekStep": 10
                        },
                        "openLayer": {
                            "className": "imgtech.media.module.OpenLayer",
                            "width": [
                                350
                            ],
                            "height": [
                                "auto"
                            ],
                            "mobile": {
                                "width": [
                                    "100%"
                                ],
                                "height": [
                                    "auto"
                                ],
                                "offsetWidth": 0,
                                "layout": "auto",
                                "enableApp": false,
                                "type": "top"
                            },
                            "hideOnClose": false,
                            "offsetWidth": 30,
                            "userelement": false,
                            "resizeable": false
                        },
                        "version": {
                            "wait": 2000
                        },
                        "size": {
                            "classList": [
                                300,
                                400,
                                500
                            ],
                            "fullscreenReplaceCss": D.b.iOS ? false : true,
                            "fullscreenReplaceFixedCss": D.b.iOS ? false : true,
                            "fullscreenHideElement": D.b.iOS ? false : true,
                            "fullscreenResizeWindow": true,
                            "fullscreenReplaceElement": D.b.iOS ? true : false,
                            "fullscreenToggleIeReplaceElement": false
                        },
                        "watchTime": {
                            "className": "imgtech.media.module.WatchTime"
                        },
                        "popup": {
                            "callback": function(){ if(window.console && window.console.log){ console.log(this.p.currentMediaSource().input); } window.open('http://renew.ebse.co.kr', 300, 200); }
                        },
                        "app": {
                            "appName": function(){},
                            "isApp": function(){ return window.zoneplayer && window.zoneplayer.isApp(); },
                            "isMobileApp": function(){ return this.isApp(); },
                            "fullscreen": function(){ if( typeof(window.zoneplayer) != "undefined" ){ window.zoneplayer.fullscreen(this.p); } },
                            "exitFullscreen": function(){ if( typeof(window.zoneplayer) != "undefined" ){ window.zoneplayer.exitFullscreen(this.p); } },
                            "dissmiss": function(){},
                            "stateChange": function(e){},
                            "useVirtualScreen": function(){}
                        },
                        "repeat": {
                            "alwaysCurrentTime": true
                        },
                        "progress": {
                            "skipInputValue": 10,
                            "skipInputIgnoreMobile": true
                        },
                        "poster": {
                            "where": "osd",
                            "click": function(e){}
                        }
                    },
                    "event": {
                        "video": true,
                        "callback": callback
                    },
                    "youtube": {
                        "quality": "all",
                        "subtitle": "all",
                        "useYoutubeOSD": true,
                        "playerVars": {
                            "enablejsapi": 1,
                            "cc_load_policy": 1,
                            "rel": 0,
                            "showinfo": 0,
                            "controls": 0,
                            "fs": 0
                        }
                    },
                    "wait": {
                        "disable": true
                    },
                    "patch": {},
                    "update": 1,
                    "element": {
                        playToggleBtn: {
                            "use": true
                        }
                    }
                };
            
        if(!params)
            params = {};
            
        cp(attr, params);
        
        if(params && params.programableHtml){
            return Media.getProgrameableHtml(id, attr);
        }
        return Media.createPlayer(id, attr, true);
    }
    
    
    ////////////////////////////////////////////////////////////////////////
    //
    //       HTML resource
    //
    ////////////////////////////////////////////////////////////////////////
    
    function getHtmlResource(){
        return ""
        + "<div viewid='mediaplayer' class='skin-draft'>\n"
        + "        \n"
        + "    <div class='mpv-underplayer'></div>\n"
        + "    \n"
        + "    <div class='mpv-device'></div>\n"
        + "    \n"
        + "    <div class='mpv-background'></div>\n"
        + "    \n"
        + "    <div class='mpv-osd'>\n"
        + "        <div class='mpv-osd-loading'></div>\n"
        + "        <div class='mpv-osd-toggle'></div>\n"
        + "    </div>\n"
        + "    \n"
        + "    <div class='mpv-info'>\n"
        + "        <div class='mpv-title'></div>\n"
        + "    </div>\n"
        + "    \n"
        + "    <div class='mpv-bottom'>\n"
        + "        <div class='mpv-subtitle-display'></div>\n"
        + "        \n"
        + "        <div class='mpv-control' autohide='0' autohide-pause='hide'>\n"
        + "            <div class='mpv-progress' seekable=true>\n"
        + "                <div class='mpv-progress-layout'>\n"
        + "                    <div class='mpv-total-progress mpv-progressbar'></div>\n"
        + "                    <div class='mpv-buffer-progress mpv-progressbar'></div>\n"
        + "                    <div class='mpv-current-progress mpv-progressbar'></div>\n"
        + "                    <div class='mpv-progress-handler' title='재생위치 핸들러'></div>\n"
        + "                    \n"
        + "                    <div class='mpv-repeat-start-marker mpv-repeat-marker' title='시작구간반복 버튼'></div>\n"
        + "                    <div class='mpv-repeat-end-marker mpv-repeat-marker' title='끝구간반복 버튼'></div>\n"
        + "                </div>\n"
        + "            </div>\n"
        + "            <div class='mpv-control-bottom'>\n"
        + "                <!--\n"
        + "                <div class='mpv-previous-btn' title='이전영상 버튼'></div>\n"
        + "                <div class='mpv-next-btn' title='다음영상 버튼'></div>\n"
        + "                -->\n"
        + "                \n"
        + "                <div class='mpv-play-toggle-btn mpv-button' title='재생/일시중지 버튼'></div>\n"
        + "                <div class='mpv-stop-btn mpv-button' title='중지 버튼'></div>\n"
        + "                <div class='mpv-previous-skip-btn mpv-button' title='뒤로 스킵 버튼'></div>\n"
        + "                <input type='input' class='mpv-skip-input mpv-hide' value=''/>\n"
        + "                <div class='mpv-next-skip-btn mpv-button'  title='앞으로 스킵 버튼'></div>\n"
        + "                <div class='mpv-repeat-btn mpv-repeat-off mpv-button' title='구간반복 버튼'></div>\n"
        + "                \n"
        + "                <div class='mpv-quality-layout'>\n"
        + "                    <div class='mpv-quality-btn' title='품질 버튼'></div>\n"
        + "                    <div class='mpv-quality-list' offset-x='' offset-y='10'>\n"
        + "                        <div class='mpv-view-ele'>\n"
        + "                            <div class='mpv-view-checked'></div>\n"
        + "                            <div class='mpv-view-text'></div>\n"
        + "                        </div>\n"
        + "                    </div>\n"
        + "                </div>\n"
        //20190423 추가 시작
		+ "					<div class='mpv-quality-layout mpv-hide'>"
		+ "						<div class='quality'>"
		+ "							<a onclick='goQualPlay(0);' class='on'>고화질</a>"
		+ "							<a onclick='goQualPlay(1);'>일반화질</a>"
		+ "						</div>"
		+ "					</div>"
		+ "					<div class='option' style='display:none'>"
		+ "						<div class='ctrl_webmark'>"
		+ "							<span class='tit_webmark'>웹갈피</span>"
		+ "							<a onclick='goCapStart();' class='add-mark'>시작<em class='icon'></em></a>"
		+ "							<a onclick='goCapEnd();' class='end-mark'><em class='icon'></em>끝</a>"
		+ "							<a onclick='goCapCancle();' class='cancel-mark'>취소<em class='icon'></em></a>"
		+ "						</div>"
		+ "					</div>"
        //20190423 추가 끝
        + "                \n"
        + "                <div class='mpv-fullscreen-toggle-btn mpv-button mpv-initscreen' title='전체화면 버튼'></div>\n"
        + "                \n"
        + "                <!--\n"
        + "                <div class='mpv-popup-toggle-btn mpv-button' title='팝업버튼'></div>\n"
        + "                -->\n"
        + "                \n"
        + "                <div class='mpv-volume-layout mpv-up-virtical'>\n"
        + "                    <div class='mpv-mute-toggle-btn mpv-button' title='볼륨/음소거 버튼'></div>\n"
        + "                    <div class='mpv-volume-slider-layout'>\n"
        + "                        <div class='mpv-volume-slider mpv-volume-ground'>\n"
        + "                            <div class='mpv-volume-background mpv-volume-ground'>\n"
        + "                                <div class='mpv-volume-foreground mpv-volume-ground'></div>\n"
        + "                                <div class='mpv-volume-handler' title='볼륨 핸들러'></div>\n"
        + "                            </div>\n"
        + "                        </div>    \n"
        + "                    </div>\n"
        + "                    \n"
        + "                </div>\n"
        + "                \n"
        + "                <div class='mpv-rate-layout'>\n"
        + "                    <div class='mpv-rate-down-btn mpv-button' title='재생속도 줄이기 버튼'></div>\n"
        + "                    <div class='mpv-rate-text mpv-ns-text'>1.0</div>\n"
        + "                    <div class='mpv-rate-up-btn mpv-button' title='재생속도 높이기 버튼'></div>\n"
        + "                </div>\n"
        + "                \n"
        + "                <div class='mpv-size-toggle-btn mpv-theater mpv-sel0' title='크기 토글 버튼'></div>\n"
        + "                \n"
        + "                <div class='mpv-subtitle-layout'>\n"
        + "                    <div class='mpv-subtitle-btn' value='subtitle' title='자막 버튼'></div>\n"
        + "                    <div class='mpv-subtitle-list'>\n"
        + "                        <div class='mpv-view-ele'>\n"
        + "                            <div class='mpv-view-checked'></div>\n"
        + "                            <div class='mpv-view-text'></div>\n"
        + "                        </div>\n"
        + "                    </div>\n"
        + "                </div>\n"
        + "                \n"
        + "                <div class='mpv-time-layout'>\n"
        + "                    <div class='mpv-currenttime-text mpv-ns-text'>0:00</div>\n"
        + "                    <div class='mpv-duration-text mpv-ns-text'>0:00</div>\n"
        + "                </div>\n"
        + "            </div>\n"
        + "        </div>\n"
        + "        \n"
        + "    </div>\n"
        + "    \n"
        + "    <div class='mpv-close-openlayer-btn mpv-button' title='오픈레이어 닫기 버튼'></div>\n"
        + "    <div class='mpv-close-openlayer-widebtn' title='오픈레이어 닫기 버튼'>\n"
        + "        <span>닫기</span>\n"
        + "        <div class='mpv-close-openlayer-close-image mpv-button'></div>\n"
        + "    </div>\n"
        + "    \n"
        + "    <div class='mpv-foreground'></div>\n"
        + "        \n"
        + "</div>\n"
        + "";
    }
    
})();
