// Global state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Starts the game after validating the player's name
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date().toLocaleString();
}

// Randomly selects rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays a single round and updates UI, score, and history
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    const playerImg = document.getElementById("playerImg");
    const computerImg = document.getElementById("computerImg");

    // Update images based on choices
    playerImg.src = playerChoice + ".png";
    computerImg.src = computerChoice + ".png";

    let roundResult = "";
    const resultElement = document.getElementById("result");

    // Determine winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultElement.style.color = "grey";
        resultElement.innerHTML = "It's a Draw!";
        // Turn images greyscale on a draw
        playerImg.style.filter = "grayscale(100%)";
        computerImg.style.filter = "grayscale(100%)";
    } else {
        // Restore full color on win or loss
        playerImg.style.filter = "none";
        computerImg.style.filter = "none";

        if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) {
            roundResult = "Win";
            wins++;
            resultElement.style.color = "green";
            resultElement.innerHTML = "You Win!";
        } else {
            roundResult = "Lose";
            losses++;
            resultElement.style.color = "red";
            resultElement.innerHTML = "You Lose!";
        }
    }

    // Store result in array and update scoreboard
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    const roundNumber = results.length;
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML += `
        <tr>
            <td>${roundNumber}</td>
            <td>${playerChoice}</td>
            <td>${computerChoice}</td>
            <td>${roundResult}</td>
        </tr>
    `;
}

// Calculates total rounds and win percentage using a for loop
function showSummary() {
    const totalRounds = results.length;
    
    if (totalRounds === 0) {
        document.getElementById("summaryOutput").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summaryOutput").innerHTML = 
        `You played ${totalRounds} rounds and won ${winPercentage}%.`;
}

// Resets all scores, arrays, table rows, and image filters back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryOutput").innerHTML = "";
    document.getElementById("playerImg").style.filter = "none";
    document.getElementById("computerImg").style.filter = "none";
    document.getElementById("playerName").value = "";
    document.getElementById("welcomeMsg").textContent = "";
}
