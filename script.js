// Function to fetch quotes from the API
async function getQuotes() {
  const response = await fetch('https://api.quotable.io/random');
  const jsonQuotes = await response.json();
  return jsonQuotes;
}

// Function to update the quote content and styles
async function updateQuote() {
  const quoteBox = document.getElementById('quote-box');
  const quoteText = document.getElementById('text');
  const quoteAuthor = document.getElementById('author');
  const tweetQuote = document.getElementById('tweet-quote');

  const quotes = await getQuotes();

  // Set quote text and author
  quoteText.textContent = quotes.content;
  quoteAuthor.textContent = quotes.author;

  // Update Twitter share link
  tweetQuote.href = `https:twitter.com/intent/tweet?text=${encodeURIComponent(quotes.content)} - ${encodeURIComponent(quotes.author)}`;

  // Change page styles with transition
  changePageStylesWithTransition();
}

// Function to change page styles with a transition
function changePageStylesWithTransition() {
  const randomColor = getRandomColor();

  // Apply transition to body background color
  document.body.style.transition = 'background-color 0.5s';
  document.body.style.backgroundColor = randomColor;

  // Apply transition to quote box text color
  const quoteBox = document.getElementById('quote-box');
  quoteBox.style.transition = 'color 0.5s';
  quoteBox.style.color = randomColor;

  // Apply transition to button background colors
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.style.transition = 'background-color 0.5s';
    button.style.backgroundColor = randomColor;
  });
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Event listener for the "New Quote" button
document.getElementById('new-quote').addEventListener('click', updateQuote);

// Initial update on page load
updateQuote();
