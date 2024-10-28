const choices = ["rock", "paper", "scissors"];
const scores = {
	humanScore: 0,
	computerScore: 0,
};

const getComputerChoice = () =>
	choices[Math.floor(Math.random() * choices.length)];

const getHumanChoice = () => {
	const humanChoice = prompt(
		`Please select one of the below choices\n${choices.map((choice) => choice)}`
	);
	if (
		typeof humanChoice !== "string" ||
		!choices.includes(humanChoice.toLowerCase())
	) {
		alert("Wrong input");
		return;
	}
	return humanChoice.toLowerCase().trim();
};

const playGame = () => {
	const playRound = (humanChoice, computerChoice) => {
		if (humanChoice === computerChoice) {
			console.log(`It's a draw`);
			return;
		}
		if (
			(humanChoice === "rock" && computerChoice === "scissors") ||
			(humanChoice === "scissors" && computerChoice === "paper") ||
			(humanChoice === "paper" && computerChoice === "rock")
		) {
			scores.humanScore++;
			console.log(`You win! ${humanChoice} beats ${computerChoice}`);
			return;
		}

		if (
			(computerChoice === "rock" && humanChoice === "scissors") ||
			(computerChoice === "scissors" && humanChoice === "paper") ||
			(computerChoice === "paper" && humanChoice === "rock")
		) {
			scores.computerScore++;
			console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
			return;
		}
	};

	for (let i = 0; i < 5; i++) {
		const humanSelection = getHumanChoice();
		const computerSelection = getComputerChoice();
		playRound(humanSelection, computerSelection);
		console.log(scores);
	}
};

playGame();
