//Function to sleep async for x ms
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//Get our leaderboard button in the header
var lbbutton = document.getElementById('leaderboardbutton');
//Get our leaderboard popup
var lbpop = document.getElementById('leaderboardpop');

//If the leaderbaord button is clicked make the leaderboard visible
lbbutton.addEventListener('click', function(){
  lbpop.style.visibility = 'visible';
})

//If the popup is clicked make the leaderboard hidden
lbpop.addEventListener('click', function(){
  lbpop.style.visibility = 'hidden';
})