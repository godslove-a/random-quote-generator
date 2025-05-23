const button = document.getElementById("fetchQuote");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const spinner = document.getElementById("spinner");

button.addEventListener("click", () => {
    spinner.classList.remove("hidden");
    quoteText.textContent = "";
    quoteAuthor.textContent = "";
    
    fetch("https://api.quotable.io/random")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }
        return response.json();
    })
    .then(data => {
        spinner.classList.add("hidden");
        quoteText.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `-${data.author}`;
    })
    .catch(error => {
        spinner.classList.add("hidden");
        quoteText.textContent = "Something went wrong. Try again";
        quoteAuthor.textContent = "";
        console.error("Error fetching the quote", error);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        button.click();
    }
});
