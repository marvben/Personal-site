window.addEventListener("load", async (event) => {
  getQuote().catch((err) => console.log(err));
  getNews(newsParams).catch((err) => console.log(err));
  categoryList()
  countryList()
});

// setInterval(() => {
//   getQuote().catch((err) => console.log(err));
// }, 50000);

const quoteAuthor = document.querySelector(".quoteAuthor");
const quoteMessage = document.querySelector(".quoteMessage");
const getButton = document.querySelector(".getButton");

getButton.addEventListener("click", async () => {
  await getQuote();
});

async function getQuote() {
  quoteAuthor.innerHTML = `<div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
  </div>`;
  quoteMessage.innerText = "";
  const quote = await axios.get("/motivation");
  quoteAuthor.innerHTML = `<span >${quote.data[0].a}</span>`;
  quoteMessage.innerText = quote.data[0].q;
}

// async function getRandomImages() {
//   try {
//     const images = await axios.get("https://picsum.photos/300");
//     return images.data;
//     console.log(images);
//   } catch (error) {
//     console.log(error);
//   }
// }


const countryRoot = document.querySelector(".countryRoot");
const categoryRoot = document.querySelector(".categoryRoot");
const root = document.querySelector(".newsRoot");
const loadingSpinner = document.querySelector(".loadingSpinner")
const newsParams = {
  categoryName:"technology",
  countryName:"us"
}

categoryRoot.addEventListener("change", async(e)=>{
  newsParams.categoryName = e.target.value;
 await getNews(newsParams)
});

countryRoot.addEventListener("change", async(e)=>{
    newsParams.countryName = e.target.value;
  await getNews(newsParams)
});

const categoryList = ()=>{
    const categoryParams=["business", "entertainment", "general", "health", "science", "sports"];
    categoryParams.forEach((category) => {
      const option = document.createElement("option");
      option.name=category;
      option.value=category;
        option.innerText=category;
      option.classList = "text-capitalize";
      categoryRoot.appendChild(option);
    });
}

const countryList = ()=>{
    const countryParams=[
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "ve",
    "za",
]
countryParams.forEach((country) => {
  const option = document.createElement("option");
  option.name=country;
  option.value=country;
    option.innerText=country;
  option.classList = "text-capitalize";
  countryRoot.appendChild(option);
});

}


async function getNews({countryName,categoryName}={}) {
root.innerHTML=``;
loadingSpinner.classList.remove("d-none")
  const news = await axios.get(`/newsList?country=${countryName}&category=${categoryName}`);
  console.log(news.data.articles);
  news.data.articles.forEach((newsArticle) => {
    const newContainer = document.createElement("div");
    newContainer.classList = "card col-lg-3 col-md-4 col-12 mb-4 p-0 justify-content-around ";
    newContainer.innerHTML = newsTemplate(newsArticle);
    root.appendChild(newContainer);
  });
  loadingSpinner.classList.add("d-none")
}

const newsTemplate = (newsArticle) => {
  const { title, description ,url , urlToImage, source, author } = newsArticle;
  return `<a href="${url}" target="_blank" >
      <img src="${urlToImage || 'https://picsum.photos/300'}"
          class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column justify-content-between align-items-start">
          <h5 class="card-title m-2 text-dark">
              ${title}
          </h5>
          <p class="card-text m-1 description text-dark">
              ${description}
          </p>
          <a href="${url}" target="_blank" class="btn button btn-lg btn-light m-1 newsSource">From ${source.name}</a>
          <p class="m-1"><strong>Author:</strong>
              ${author || "Unanimous"}
          </p>
      </div>
  </a>
  `;
};


//  Greained particles
var option = {
  animate: true,
  patternWidth: 263.34,
  patternHeight: 203.02,
  grainOpacity: 0.11,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
};

grained("#main", option);
