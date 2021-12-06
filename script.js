var maxX = 450;
var maxY = 450;
var virusNum = 5;
var live = "https://cdn-icons-png.flaticon.com/512/3022/3022142.png";
var dead = "https://cdn-icons-png.flaticon.com/512/3022/3022151.png";


var box = document.getElementById("box");
var boxTop = box.getBoundingClientRect().top;
var boxLeft = box.getBoundingClientRect().left;


function getRange(value, min, max) {
  if (value < min)
    return min + (min - value);
  if (value > max)
    return max - (value - max);
  return value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setStartPosition() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.left = getRandomInt(boxLeft, boxLeft + maxX) + "px";
    document.getElementById('i' + i).style.top = getRandomInt(boxTop, boxTop + maxY) + "px";
  }
}

function disp() {
  var l = 50;
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

function killVirus(obj) {
  console.log(obj.id);
  clickedId = obj.id;
  if (document.getElementById(clickedId).src == live) {
    document.getElementById(clickedId).src = dead;
    document.getElementById(clickedId).style.zIndex = 0;
    virusNum = virusNum - 1;
    document.getElementById("virus").innerHTML = "남은 개수: " + virusNum + "개";
  }
}

function timer() {
  disp();
  my_time = setTimeout('timer()', 200);
}

function stop() {
  setTime = 60;
  virusNum = 5;
  document.getElementById("timer").innerHTML = "남은 시간: " + setTime + "초";
  document.getElementById("virus").innerHTML = "남은 개수: " + virusNum + "개";
  console.log("stop");
  clearTimeout(my_time);
  btnAbled();
  clearInterval(play);
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.display = "none";
    document.getElementById('i' + i).src = live;
  }
}

function start() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('i' + i).style.display = "";
  }
  console.log("start");
  setStartPosition();
  timer();
  btnDisabled();
  startTime();
}

function btnAbled() {
  document.getElementById("start").disabled = false;
}

function btnDisabled() {
  document.getElementById("start").disabled = true;
}

function endGame() {
  if (virusNum == 0) {
    alert("성공");
    stop();
  }
}

var play = 0;
var setTime = 60;

function startTime() {
  setTime = 60;
  clearInterval(play);
  play = setInterval("countDownTimer()", 1000);
}

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