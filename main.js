
// When loaded add event listeners
window.addEventListener('load',function(){
  openNewTab()
})


function openNewTab(){
  // open tab to blackout page
  chrome.tabs.create({url: chrome.runtime.getURL("blackout.html")}, function(tab) {
    // Tab opened.
  });
}

