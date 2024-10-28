const btns = document.querySelectorAll(".play-round");
const btnReset = document.querySelector(".btn-reset");
const roundResult = document.querySelector(".round-result");

const roundLabel = document.querySelector(".round-title");
const humanScoreLabel = document.querySelector("#human-score");
const computerScoreLabel = document.querySelector("#computer-score");

const choices = ["rock", "paper", "scissors"];
const gameInfo = {
	isGameOver: false,
	round: 0,
	scores: {
		humanScore: 0,
		computerScore: 0,
	},
};

const playGame = () => {
	const getComputerChoice = () =>
		choices[Math.floor(Math.random() * choices.length)];

	const updateScore = (target, gameStats = gameInfo) =>
		gameStats.scores[target]++;

	const updateUI = (roundMessage, label, score) => {
		roundResult.textContent = roundMessage;

		if (label === humanScoreLabel) {
			roundResult.style.color = "#cee5f2";
		} else if (label === computerScoreLabel) {
			roundResult.style.color = "#f25f5c";
		} else {
			roundResult.style.color = "#f5cb5c";
		}

		if (!label || !score) return;
		label.textContent = score;
	};

	const resetUI = () => {
		roundResult.textContent = "";
		roundLabel.textContent = "";
		humanScoreLabel.textContent = 0;
		computerScoreLabel.textContent = 0;

		btnReset.classList.remove("active");
	};

	const checkGameOver = () => {
		if (gameInfo.scores.humanScore >= 5 || gameInfo.scores.computerScore >= 5) {
			gameInfo.isGameOver = true;
			btnReset.classList.add("active");
		}
	};

	const playRound = (e) => {
		if (!gameInfo.isGameOver) {
			gameInfo.round++;
			roundLabel.textContent = `Round ${gameInfo.round}`;

			const humanChoice = e.target.dataset.id;
			const computerChoice = getComputerChoice();

			if (humanChoice === computerChoice) {
				updateUI("It's a draw");
				checkGameOver();
				return;
			}
			if (
				(humanChoice === "rock" && computerChoice === "scissors") ||
				(humanChoice === "scissors" && computerChoice === "paper") ||
				(humanChoice === "paper" && computerChoice === "rock")
			) {
				updateScore("humanScore");

				updateUI(
					`You win! ${humanChoice} beats ${computerChoice}`,
					humanScoreLabel,
					gameInfo.scores.humanScore
				);
				checkGameOver();

				return;
			}

			if (
				(computerChoice === "rock" && humanChoice === "scissors") ||
				(computerChoice === "scissors" && humanChoice === "paper") ||
				(computerChoice === "paper" && humanChoice === "rock")
			) {
				updateScore("computerScore");
				updateUI(
					`You lose! ${computerChoice} beats ${humanChoice}`,
					computerScoreLabel,
					gameInfo.scores.computerScore
				);
				checkGameOver();

				return;
			}
		}
	};

	// Loop through buttons to attach click events
	btns.forEach((btn) => {
		btn.addEventListener("click", playRound);
	});

	// Reset button click event
	btnReset.addEventListener("click", () => {
		// Reset the global gameInfo object back to default
		Object.assign(gameInfo, {
			isGameOver: false,
			round: 0,
			scores: {
				humanScore: 0,
				computerScore: 0,
			},
		});

		// Reset the UI to reflect the changes
		resetUI();
	});
};

playGame();
