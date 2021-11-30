var maxX = 500;
var maxY = 500;
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
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
function setStartPosition() {
  for (var i = 1; i <= 3; i++) {
    document.getElementById('i' + i).style.left = getRandomInt(boxLeft, boxLeft + maxX) + "px";
    document.getElementById('i' + i).style.top = getRandomInt(boxTop, boxTop + maxY) + "px";
  }
}

function disp() {
  var l = 30;
  for (var i = 1; i <= 3; i++) {
    var stepX = getRandomInt(-l, l);
    var stepY = getRandomInt(-l, l);
    //alert("Hello");
    var y = document.getElementById('i' + i).offsetTop;
    var x = document.getElementById('i' + i).offsetLeft;
    y = getRange(y + stepY, boxLeft, boxLeft + maxX);
    x = getRange(x + stepX, boxTop, boxTop + maxY);
    document.getElementById('i' + i).style.top = y + "px"; // vertical movment
    document.getElementById('i' + i).style.left = x + "px"; //horizontal move
  }
}

function timer() {
  disp();
  my_time = setTimeout('timer()', 100);
}

function stop() {
  console.log("stop");
  clearTimeout(my_time);
}

function start() {
  console.log("start");
  setStartPosition();
  timer();
  // console.log(box)
  // console.log(box.getBoundingClientRect())
  console.log(boxTop);
  console.log(boxLeft);
}
