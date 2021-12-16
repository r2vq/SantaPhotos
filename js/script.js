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

  let preview = buildPreview();
  document.body.appendChild(preview);
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
  image.addEventListener("click", () => {
    let preview = document.querySelector("preview");
    preview.classList.remove("hidden");
    preview.classList.add("fadeIn");
    let largeImage = document.createElement("img");
    preview.appendChild(largeImage);
    largeImage.classList.add("largePhoto");
    largeImage.setAttribute("src", data.image);
    largeImage.setAttribute("alt", data.alt);
    document.body.classList.add("stopScrolling");
  });
  let subheader = document.createElement("subheader");
  article.appendChild(subheader);
  subheader.innerText = data.body;
  return article;
}

function buildPreview() {

  function onAnimationEnd() {
    preview.classList.remove("fadeOut");
    preview.classList.add("hidden");
    preview.innerHTML = "";
    preview.removeEventListener("animationend", onAnimationEnd);
  }

  let preview = document.createElement("preview");
  preview.classList.add("hidden");
  preview.addEventListener("click", () => {
    preview.classList.remove("fadeIn");
    preview.classList.add("fadeOut");
    preview.addEventListener("animationend", onAnimationEnd);
    document.body.classList.remove("stopScrolling");
  });
  return preview;
}
