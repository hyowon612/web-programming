var maxX = 450; // 이미지 최대 이동 영역
var maxY = 450; // 이미지 최대 이동 영역
var virusNum = 5; // 살아있는 바이러스 개수
var live = "https://cdn-icons-png.flaticon.com/512/3022/3022142.png"; // 살아있는 바이러스 이미지
var dead = "https://cdn-icons-png.flaticon.com/512/3022/3022151.png"; // 죽은 바이러스 이미지

// 박스 위치 불러오기
var box = document.getElementById("box");
var boxTop = box.getBoundingClientRect().top;
var boxLeft = box.getBoundingClientRect().left;

// 이미지 이동 범위
function getRange(value, min, max) {
  if (value < min)
    return min + (min - value);
  if (value > max)
    return max - (value - max);
  return value;
}

// 랜덤한 정수 뽑기
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// 이미지 시작 위치 정하기
function setStartPosition() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.left = getRandomInt(boxLeft, boxLeft + maxX) + "px";
    document.getElementById('i' + i).style.top = getRandomInt(boxTop, boxTop + maxY) + "px";
  }
}

// 이미지 이동
function disp() {
  var l = 30; // 이미지 1회 이동시 이동 거리
  for (var i = 1; i <= 5; i++) {
    if (document.getElementById('i' + i).src === dead) {

    } else {
    var stepX = getRandomInt(-l, l);
    var stepY = getRandomInt(-l, l);
    var y = document.getElementById('i' + i).offsetTop;
    var x = document.getElementById('i' + i).offsetLeft;
    y = getRange(y + stepY, boxTop, boxTop + maxY);
    x = getRange(x + stepX, boxLeft, boxLeft + maxX);
    document.getElementById('i' + i).style.top = y + "px";
    document.getElementById('i' + i).style.left = x + "px";
    }
  }
}

// 이미지 클릭시 이벤트
function killVirus(obj) {
  console.log(obj.id);
  clickedId = obj.id;
  if (document.getElementById(clickedId).src == live) {
    document.getElementById(clickedId).src = dead; // 이미지 변경
    document.getElementById(clickedId).style.zIndex = 0; // 수직위치 맨 뒤로 수정
    virusNum = virusNum - 1; // 살아있는 바이러스 수 1 감소
    document.getElementById("virus").innerHTML = "남은 개수: " + virusNum + "개";
  }
}

// 이미지 이동 속도(시간)
function timer() {
  disp();
  my_time = setTimeout('timer()', 300); // 0.3초에 한번씩 이동
}

// 리셋 버튼 클릭시
function stop() {
  setTime = 60; // 남은 시간 리셋
  virusNum = 5; // 남은 개수 리셋
  document.getElementById("timer").innerHTML = "남은 시간: " + setTime + "초";
  document.getElementById("virus").innerHTML = "남은 개수: " + virusNum + "개";
  console.log("stop");
  clearTimeout(my_time);
  btnAbled();
  clearInterval(play);
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.display = "none"; // 이미지 숨기기
    document.getElementById('i' + i).src = live; // 살아있는 이미지로 변경
  }
}

// 시작 버튼 클릭시
function start() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.display = ""; // 이미지 표시
  }
  console.log("start");
  setStartPosition();
  timer();
  btnDisabled();
  startTime();
}

// 버튼 비활성화
function btnAbled() {
  document.getElementById("start").disabled = false;
}

// 버튼 활성화
function btnDisabled() {
  document.getElementById("start").disabled = true;
}

// 모든 바이러스를 죽였을시
function endGame() {
  if (virusNum == 0) {
    alert("성공");
    stop();
  }
}

var play = 0;
var setTime = 60; // 타이머 디폴트 값

// 남은 시간 타이머
function startTime() {
  setTime = 60;
  clearInterval(play);
  play = setInterval("countDownTimer()", 1000);
}

// 타이머 카운트 다운
function countDownTimer() {
  setTime--;
  document.getElementById("timer").innerHTML = "남은 시간: " + setTime + "초";
  endGame();
  if (setTime < 0) {
    clearInterval(play);
    alert("시간 초과");
    stop();
  }
}