async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

var lbbutton = document.getElementById('leaderboardbutton');
var lbpop = document.getElementById('leaderboardpop');

lbbutton.addEventListener('click', function(){
  lbpop.style.visibility = 'visible';
})

lbpop.addEventListener('click', function(){
  lbpop.style.visibility = 'hidden';
})