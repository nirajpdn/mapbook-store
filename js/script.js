const products = [
  {
    id: 1,
    name: "Mapbook Air M6",
    image: "/images/map-book-air.webp",
    price: "Rs.209,000",
    url: "/product/map-book-air-m6.html",
  },
  {
    id: 1,
    name: "Mapbook Pro M5",
    image: "/images/mapbook-pro.jpg",
    price: "Rs.348,145",
    url: "/product/map-book-pro-m5-chip.html",
  },
];

const rootElement = document.querySelector(".root");
const breadCrumbContainer = document.querySelector(".breadcrumb-container");
const greetingEl = document.querySelector("#greeting");
const productGridContainer = document.querySelector(".product-content__grid");
const singleProductContainer = document.querySelector(
  ".single-product-content"
);

const navElement = `
<nav>
<div class="nav-container nav-wrapper">
<h2 class="nav-brand">Laptop Store</h2>
</div> 
</nav>
`;

rootElement.insertAdjacentHTML("beforebegin", navElement);

// if current location pathname is /product/map-book-air-m2 then pathnameList = ["","product","map-book-air-m2"]
const pathnameList = window.location.pathname.split("/");

let breadcrumbItems = pathnameList.filter(
  (item, index) => index === 0 || !!item
);

breadcrumbItems = breadcrumbItems.map((item, index) => ({
  name: item || "Home",
  url: `/${item}`,
  current: index === breadcrumbItems.length - 1,
}));

const breadCrumbItemCreater = (item) => {
  const linkItem = `<a href=${item.url}>${item.name}</a>`;
  const text = item.name.split(".html")[0] || "";
  return item.current ? text : linkItem;
};

const generateGreeting = () => {
  const date = new Date();
  const hrs = date.getHours();
  let greet;
  if (hrs < 12) greet = "Good Morning 😀";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon 😎";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening 🥸";
  return greet;
};

const navigateToProduct = () => {
  window.location.href = window.location.origin + "/product";
};

const initializeBreadcrumb = () => {
  if (greetingEl) {
    greetingEl.innerText = generateGreeting();
  }
  if (!breadCrumbContainer) return;
  breadcrumbItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = breadCrumbItemCreater(item);
    breadCrumbContainer.appendChild(li);
  });
};
const initializeProductGrid = () => {
  if (productGridContainer) {
    products.forEach((product) => {
      const productCard = document.createElement("a");
      productCard.className = "product-card";
      productCard.setAttribute("href", product.url);
      productCard.innerHTML = `
      <div class="thumbnail">
        <img src=${product.image} alt="" />
      </div>
      <div class="product-details">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-price">${product.price}</p>
      </div>
    `;
      productGridContainer.appendChild(productCard);
    });
  }
};
const initializeSingleProduct = () => {
  if (singleProductContainer) {
    const pathname = window.location.pathname;
    const product = products.find((item) => item.url === pathname);
    if (!product) return;
    const thumbnail = document.createElement("div");
    const details = document.createElement("div");
    thumbnail.className = "single-product-content__thumnbnail";
    details.className = "single-product-content__details";
    thumbnail.innerHTML = `
      <img src=${product.image} alt=${product.name} />
      `;
    details.innerHTML = `
      <h1 class="single-product-content__details-title">${product.name}</h1>
      <p class="single-product-content__details-price">${product.price}</p>
      <p class="single-product-content__details-description">Sorry 😔, this product is not available in your region. Try windows for better experience.</p>
    `;
    singleProductContainer.appendChild(thumbnail);
    singleProductContainer.appendChild(details);
  }
};

initializeBreadcrumb();
initializeProductGrid();
initializeSingleProduct();
