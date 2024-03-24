// "use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.querySelector(".loader");

// let apiQuotes = [];


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuotes(apiQuotes) {
  showLoadingSpinner();
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
  removeLoadingSpinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiURL);
    const apiQuotes = await response.json();
    newQuotes(apiQuotes);
  } catch (error) {
    console.error("try again");
  }
}

// useQuotableAPI
async function getQuotes2(){
  const proxyURL = 'https://cors-anywhere.herokuapp.com/'
  const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  try{
    const response = await fetch(proxyURL + apiURL)
    const data = await response.json()
    // newQuotes(data)
  } catch {
    // getQuotes2()
    // console.log('error please try again', error);
  } 
}
getQuotes2()

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}


newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
