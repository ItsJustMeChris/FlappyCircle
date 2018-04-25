class leaderboard {
    constructor() {
        this.highScores = localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : [];
        this.leaderBoardDom = document.getElementById('leaderboard');
        this.highScores.sort(function(a,b) { return b['score'] - a['score'] } );
        this.highScores.forEach(element => {
            let test = document.createElement('div');
            test.innerHTML = element['user'] + " SCORE: " + element['score'];
            this.leaderBoardDom.appendChild(test);
        });
    }

    saveScore(user,score) {
        this.highScores.push({user:user,score:score});
        localStorage.setItem('highscores', JSON.stringify(this.highScores));
    }
}