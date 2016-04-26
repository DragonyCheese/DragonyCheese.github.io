var randomNumber;
var cResult;
var pResult;
var playerImage;
var computerImage;
var pScore = 0;
var cScore = 0;
var scoreText;
var totalWins = 0;
var totalLosses = 0;

function update(num){

	//RNG 1-3
	randomNumber = Math.floor((Math.random() * 3) + 1);
	
		if (randomNumber==1){
			
			computerImage = "rock.jpg";
		}
		else if (randomNumber==2){
			
			computerImage = "paper.jpg";
		}
		else if (randomNumber==3){
			
			computerImage = "scissors.jpg";
		}

	//if 1 say rock
		if (num == 1){
			playerImage="rock.jpg";
		}
		else if (num == 2){
			playerImage="paper.jpg";

		}
		else if (num == 3){
			playerImage="scissors.jpg";
		}	

		if (num == randomNumber) {
			//tie
			scoreText = "You're barely on par with a computer. How does that feel?";
		}
		else if (num==1 && randomNumber==2) {
			//lose
			scoreText = "Seriously? You can't even beat a bot?";
			cScore =  cScore + 1;
		}
		else if (num==1 && randomNumber==3) {
			//win
			scoreText="Good for you. You can win against a computer in a game of luck. Try something harder, like memorizing your own phone number.";
			pScore = pScore + 1;
		}
		else if (num==2 && randomNumber==1) {
			//win
			scoreText="Good for you. You can win against a computer in a game of luck. Now try something harder, like memorizing your own phone number.";
			pScore = pScore + 1;
		}
		else if (num==2 && randomNumber==3) {
			//lose
			scoreText="Seriously? You can't even beat a bot?";
			cScore = cScore + 1;
		}

		else if (num==3 && randomNumber==1) {
			//lose
			scoreText="Seriously? You can't even beat a bot?";
			cScore = cScore + 1;
		}

		else if (num==3 && randomNumber==2) {
			//win
			scoreText="Good for you. You can win against a computer in a game of luck. Now try something harder, like memorizing your own phone number.";
			pScore = pScore + 1;
		}

		if (pScore == 2) {
			scoreText="Oh wow! You did it! You defeated the fearsome random number generator in a game of pure skill! Give yourself a pat on the back, then seriously ask yourself why you're spending time doing this. Get a life.";
			pScore = 0;
			cScore = 0;
			totalWins++;
		}

		if (cScore == 2) {
			scoreText="This must feel horrible. After all the effort you must have put into playing this game, you were defeated by a lowly random number generator.";
			pScore = 0;
			cScore = 0;
			totalLosses++;
		}

		// document.getElementById('pResult').innerHTML = pResult;
		// document.getElementById('cResult').innerHTML = cResult;
		//document.getElementById('scoreText').innerHTML = scoreText;	
		document.getElementById('player-image').innerHTML = '<img class="theImage" src="img/' +playerImage+ '" >';
		document.getElementById('computer-image').innerHTML = '<img class="theImage" src="img/' +computerImage+ '" >';
		document.getElementById('playerScore').innerHTML = pScore;
		document.getElementById('computerScore').innerHTML = cScore;
		document.getElementById('scoreText').innerHTML = scoreText;
		document.getElementById('wins').innerHTML = totalWins;
		document.getElementById('losses').innerHTML = totalLosses
}
