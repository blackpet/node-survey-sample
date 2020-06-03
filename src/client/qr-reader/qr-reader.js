import jsQR from "jsqr";
import $ from 'jquery';


var video;
var cameraCv, cameraCvCtx;
var output;
var goMode = false;
var goModeLabel = ['감지만 하기', '즉시이동'];

$(function () {

  $('#attendByQrBtn').click(startQrCamera);
  $('#goModeBtn').click(function (e) {
    goMode = !goMode;
    $(this).text(goMode ? goModeLabel[1] : goModeLabel[0]);
  });
  output = $('#output');

  video = document.createElement('video');
  cameraCv = document.getElementById('cameraCv');
  cameraCvCtx = cameraCv.getContext('2d');
});


function startQrCamera() {
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();

    requestAnimationFrame(readQr);
  });
}

function readQr() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    console.log('wating...');

    cameraCv.hidden = false;

    cameraCv.width = video.videoWidth;
    cameraCv.height = video.videoHeight;
    cameraCvCtx.drawImage(video, 0, 0, cameraCv.width, cameraCv.height);
    var imageData = cameraCvCtx.getImageData(0, 0, cameraCv.width, cameraCv.height);

    var code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'dontInvert'});
    if (!code) {
      output.text('No QR code detected.');
    } else {
      drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#ff3b58');
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#ff3b58');
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#ff3b58');
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#ff3b58');

      if (goMode) {
        location.href = code.data;
      } else {
        output.text(`URL: ${code.data}`);
      }
    }
  } else {
    console.log('cannot access camera...');
  }
  requestAnimationFrame(readQr);
}

function drawLine(begin, end, color) {
  cameraCvCtx.beginPath();
  cameraCvCtx.moveTo(begin.x, begin.y);
  cameraCvCtx.lineTo(end.x, end.y);
  cameraCvCtx.lineWidth = 4;
  cameraCvCtx.strokeStyle = color;
  cameraCvCtx.stroke();
}
