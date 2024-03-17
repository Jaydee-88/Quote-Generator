// "use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector(".loader");

// let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuotes(apiQuotes) {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // const quote = apiQuotes[12];
  // console.log(apiQuotes);
  const checkQuote =
    !quote.author || quote.author === "Anonymous"
      ? (authorText.textContent = "Unknown")
      : (authorText.textContent = authorText.textContent = quote.author);
  // Check quote lenght to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiURL);
    const apiQuotes = await response.json();
    newQuotes(apiQuotes);
  } catch (error) {
    // Catch errror
    console.error("try again");
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

// function test() {
//   console.log(quoteText.textContent);
//   console.log(authorText.textContent);
// }

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
