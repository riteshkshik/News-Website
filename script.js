const API_KEY = "b869fe433b5841acbfd5c14a804d5837";
// b869fe433b5841acbfd5c14a804d5837
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.querySelector('.cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#new-img');
    const newsTitle = cardClone.querySelector('#new-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}🔹${date}`;

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, "_blank");
    });
}

let currSelectedNav = null;
function onNavItemClick(query){
    fetchNews(query);
    const navItem = document.getElementById(query)
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('search-button');
const searchTxt = document.querySelector('.news-input');

searchBtn.addEventListener('click', () =>{
    const query = searchTxt.value;
    if(!query) return;
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
    fetchNews(query);
});

function reload(){
    window.location.reload();
}