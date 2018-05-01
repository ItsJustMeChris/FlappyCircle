//Leaderboard class
class leaderboard {
    //Constructor for a leaderboard
    constructor() {
        //Check if our highscores exists in local storage, if then make them into an array, if not make a new array. 
        this.highScores = localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : [];
        //Get the leaderboard on the dom
        this.leaderBoardDom = document.getElementById('leaderboard');
        //Sor the scores to go form highest to lowest
        this.highScores.sort(function(a,b) { return b['score'] - a['score'] } );
        //Output scores on the dom
        this.highScores.forEach(element => {
            //Sanity check to avoid scores of 0
            if (element['score'] == 0) {
                return;
            }
            //Create a new div for the score
            let elem = document.createElement('div');
            //Set the inner HTML of the div with the username and score
            elem.innerHTML = element['user'] + " SCORE: " + element['score'];
            //Add the score to the leaderboard
            this.leaderBoardDom.appendChild(elem);
        });
    }

    //Save a score
    saveScore(user,score) {
        //Push the score to our highscores
        this.highScores.push({user:user,score:score});
        //Save the scores in the local storage
        localStorage.setItem('highscores', JSON.stringify(this.highScores));
    }
}