const accessKey = "rL9_Owix-ivNTdrF4RVhWOz8iDmX8o1lelRZOg62t2U"; 
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");

// require('dotenv').config();
// console.log(process.env);

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value.trim();
    if (!keyword) return; // Do not search if the search box is empty

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous search results
    await searchImages();
});

showMoreBtn.addEventListener("click", async () => {
    page++; // Increment page number
    await searchImages(); // Fetch next page of search results
});

