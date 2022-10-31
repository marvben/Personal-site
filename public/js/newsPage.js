window.addEventListener("load", async (event) => {
  getQuote().catch((err) => console.log(err));
  getNews().catch((err) => console.log(err));
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

// async function getRandomImages() {
//   try {
//     const images = await axios.get("https://picsum.photos/300");
//     return images.data;
//     console.log(images);
//   } catch (error) {
//     console.log(error);
//   }
// }

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

const root = document.querySelector(".newsRoot");
async function getNews() {
  const news = await axios.get("/newsList");
  const images = await axios.get("https://picsum.photos/v2/list");

  news.data.forEach((singleNews, i) => {
    const newContainer = document.createElement("div");
    const randomImagesUrl = images.data[i].download_url;
    newContainer.classList = "card col-lg-3 col-md-4 col-5 mb-4 p-0 justify-content-around ";
    newContainer.innerHTML = newsTemplate(singleNews, randomImagesUrl);
    root.appendChild(newContainer);
  });
}

const newsTemplate = (singleNews, randomImagesUrl) => {
  const { title, description, image, source, author, url } = singleNews;
  console.log(randomImagesUrl);
  return `<a href="${url}" target="_blank" >
      <img src="${image || randomImagesUrl}"
          class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column justify-content-between align-items-start">
          <h5 class="card-title m-2 text-dark">
              ${title}
          </h5>
          <p class="card-text m-1 description text-dark">
              ${description.slice(0, 50)}
          </p>
          <a href="${url}" target="_blank" class="btn button btn-lg btn-light m-1 newsSource">From ${source}</a>
          <p class="m-1"><strong>Author:</strong>
              ${author || "Unanimous"} 
          </p>
      </div>
  </a>
  `;
};
