// Main Method
(() => {
  console.log("Hello world!");
  fetch("js/content.json")
    .then(response => response.json())
    .then(data => buildPage(data));
})();
/**
 * Build the page from the JSON provided.
 */
function buildPage(data) {
  document.body.innerHTML = "";

  let header = buildHeader(data.header);
  document.body.appendChild(header);

  data.years.forEach((year, i) => {
    let section = buildSection(year);
    document.body.appendChild(section);
  });

  let nav = buildNav(data.years);
  document.body.appendChild(nav);
}

function buildNav(data) {
  let nav = document.createElement("nav");
  let ul = document.createElement("ul");
  nav.appendChild(ul);
  data.forEach(year => {
    let li = document.createElement("li");
    ul.appendChild(li);
    let anchor = document.createElement("a");
    li.appendChild(anchor);
    anchor.setAttribute("href", `#${year.id}`);
    anchor.innerText = year.title;
  });

  return nav;
}

function buildHeader(data) {
  let header = document.createElement("section");
  header.classList.add("header");
  let headerTitle = document.createElement("header");
  header.appendChild(headerTitle);
  headerTitle.innerText = data.title;
  let subheader = document.createElement("subheader");
  header.appendChild(subheader);
  subheader.innerText = data.body;
  return header;
}

function buildSection(data) {
  let section = document.createElement("section");
  section.id = data.id;
  let header = document.createElement("header");
  section.appendChild(header);
  header.innerText = data.title;
  data.photos.forEach(photo => {
    let article = buildArticle(photo);
    section.appendChild(article);
  });

  return section;
}

function buildArticle(data) {
  let article = document.createElement("article");
  let image = document.createElement("img");
  article.appendChild(image);
  image.classList.add("photo");
  image.setAttribute("src", data.image);
  image.setAttribute("alt", data.alt);
  let subheader = document.createElement("subheader");
  article.appendChild(subheader);
  subheader.innerText = data.body;
  return article;
}
