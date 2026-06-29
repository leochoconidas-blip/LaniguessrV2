async function loadQuotes(){

    const response = await fetch("data/quotes.json");

    quotesGame.quotes = await response.json();

    console.log("Citations chargées :", quotesGame.quotes);

}

async function startQuoteGame(){

    if(quotesGame.quotes.length === 0){

        alert("Les citations sont encore en cours de chargement.");

        return;

    }

    quotesGame.score = 0;
    quotesGame.round = 1;
    quotesGame.usedQuotes = [];
    quotesGame.totalRounds = quotesGame.quotes.length;

    nextQuote();

}

function nextQuote(){

    const available = quotesGame.quotes.filter(quote =>

        !quotesGame.usedQuotes.includes(quote.id)

    );

    if(available.length === 0){

        finishQuoteGame();

        return;

    }

    quotesGame.currentQuote = available[0];

    quotesGame.usedQuotes.push(quotesGame.currentQuote.id);

    displayQuote();

}

function displayQuote(){

    document.getElementById("round").textContent = quotesGame.round;
    document.getElementById("totalRounds").textContent = quotesGame.totalRounds;
    document.getElementById("score").textContent = quotesGame.score;

    document.getElementById("game").innerHTML = `

        <div class="quote">

            <h2>Citation ${quotesGame.round}</h2>

            <blockquote>

                "${quotesGame.currentQuote.quote}"

            </blockquote>

            <input
                id="quoteCharacter"
                placeholder="Personnage">

            <input
                id="quoteAnime"
                placeholder="Œuvre">

            <br><br>

            <button
                id="validateQuote"
                onclick="checkQuoteAnswer()">

                Valider

            </button>

        </div>

    `;

    document
        .getElementById("quoteCharacter")
        .addEventListener("keydown", quoteEnter);

    document
        .getElementById("quoteAnime")
        .addEventListener("keydown", quoteEnter);

}

function quoteEnter(event){

    if(event.key === "Enter"){

        checkQuoteAnswer();

    }

}

function checkQuoteAnswer(){

    const characterAnswer = document
        .getElementById("quoteCharacter")
        .value;

    const animeAnswer = document
        .getElementById("quoteAnime")
        .value;

    const goodCharacter = quotesGame.currentQuote.character.some(answer =>

        normalize(answer) === normalize(characterAnswer)

    );

    const goodAnime = quotesGame.currentQuote.anime.some(answer =>

        normalize(answer) === normalize(animeAnswer)

    );

    if(goodCharacter)
        quotesGame.score++;

    if(goodAnime)
        quotesGame.score++;

    document.getElementById("score").textContent = quotesGame.score;

    displayQuoteCorrection(
        goodCharacter,
        goodAnime
    );

}

function displayQuoteCorrection(goodCharacter, goodAnime){

    document.getElementById("quoteCharacter").disabled = true;
    document.getElementById("quoteAnime").disabled = true;

    document.getElementById("validateQuote").disabled = true;

    document.getElementById("game").innerHTML += `

        <div class="quoteCorrection">

            <p class="${goodCharacter ? "good" : "bad"}">

                Personnage :

                ${goodCharacter ? "✔" : "✖"}

            </p>

            ${
                !goodCharacter

                ?

                `<p>

                    Réponse :

                    ${quotesGame.currentQuote.character[0]}

                </p>`

                :

                ""

            }

            <p class="${goodAnime ? "good" : "bad"}">

                Œuvre :

                ${goodAnime ? "✔" : "✖"}

            </p>

            ${
                !goodAnime

                ?

                `<p>

                    Réponse :

                    ${quotesGame.currentQuote.anime[0]}

                </p>`

                :

                ""

            }

            <button onclick="nextQuoteRound()">

                Citation suivante →

            </button>

        </div>

    `;

}

function nextQuoteRound(){

    quotesGame.round++;

    if(quotesGame.round > quotesGame.totalRounds){

        finishQuoteGame();

        return;

    }

    nextQuote();

}

function finishQuoteGame(){

    document.getElementById("game").innerHTML = `

        <h2>Mode Citations terminé !</h2>

        <p>

            Score :

            ${quotesGame.score}

            /

            ${quotesGame.totalRounds * 2}

        </p>

        <button onclick="startQuoteGame()">

            Rejouer

        </button>

    `;

}

loadQuotes();