
var totalSeconds
var timer
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

// When loaded add event listeners
window.addEventListener('load',function(){
  document.getElementById('startBtn').addEventListener('click',startTimer)
  document.getElementById('stopBtn').addEventListener('click',  closeFullscreen  )
})

// Detect if full screen is active
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      stopTimer()
    }
}
/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function toggleScreens(){
  let bo = document.getElementById('blackout')
  let is = document.getElementById('inputScreen')

  if (bo.className == "hide"){
    bo.className = ''
  }else{
    bo.className = 'hide'
  }

  if (is.className == "hide"){
    is.className = ''
  }else{
    is.className = 'hide'
  }
}

function startTimer(){

  // Get the minutes from counter
  let inputMinutes = document.getElementById('minutes').value
  if(inputMinutes <= 0 && inputMinutes != undefined){
    alert("Enter Valid minutes ")
    return;
  }

  // Update Global variable
  totalSeconds = inputMinutes * 60;

  // Blackout screen
  openFullscreen()
  toggleScreens()
  updateTimer()
  timer =  setInterval(updateTimer,1000)
}

function updateTimer(){
  if(totalSeconds < 0 ){
    // Remove blackoutScreen
    resetTimer()
    clearInterval(timer)
  }

  // Determine mins and seconds
  let mins = Math.floor(totalSeconds / 60);
  let secs = totalSeconds % 60;

  mins = mins < 10 ? "0" + mins : mins
  secs = secs < 10 ? "0" + secs : secs

  // Update Value
  document.getElementById('mins').innerHTML = mins
  document.getElementById('secs').innerHTML = secs
  totalSeconds --;
}

function resetTimer(){
  toggleScreens()
  closeFullscreen()
  document.getElementById('mins').innerHTML = ''
  document.getElementById('secs').innerHTML = ''
}

function stopTimer(){
  clearInterval(timer)
  resetTimer()
}