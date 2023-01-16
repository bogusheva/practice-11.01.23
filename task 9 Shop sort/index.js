import { products } from "./products.js";

let productsList = document.querySelector(".cards-container");
let price1 = document.querySelector(".price-from");
let price2 = document.querySelector(".price-to");
let searchButton = document.querySelector(".search-submit");
let resetButton = document.querySelector(".reset");
let minToMaxButton = document.querySelector(".min-button");
let maxToMinButton = document.querySelector(".max-button");
let selectBrand = document.querySelector("#select-brands");
let selectCategory = document.querySelector("#select-category");
let mainBasket = document.querySelector(".main-basket");
let basketWindow = document.querySelector(".basket-window");
let closeButton = document.querySelector(".close-button");
let basketSum = document.querySelector(".basket-sum");
let orderList = document.querySelector(".order-list");
let basketArray = [];

function showArray(array) {
  array.map((element) => {
    let productCard = document.createElement("li");
    productCard.classList.add("product-item");
    let productCardWrapper = document.createElement("div");
    productCardWrapper.classList.add("card-wrapper");
    let productCardImg = document.createElement("a");
    productCardImg.setAttribute("href", "#");
    productCardImg.classList.add("image-wrapper");
    let productCardText = document.createElement("div");
    productCardText.classList.add("product-text");
    let productCardCategory = document.createElement("a");
    productCardCategory.setAttribute("href", "#");
    productCardCategory.classList.add("product-category");
    let productCardName = document.createElement("a");
    productCardName.setAttribute("href", "#");
    productCardName.classList.add("product-name");
    let productCardBrand = document.createElement("span");
    productCardBrand.classList.add("product-brand");
    let productCardPriceBefore = document.createElement("span");
    productCardPriceBefore.classList.add("product-price1");
    let productCardPrice = document.createElement("span");
    productCardPrice.classList.add("product-price2");
    let productCardRating = document.createElement("ul");
    productCardRating.classList.add("product-rating");
    let productCardBasket = document.createElement("a");
    productCardBasket.setAttribute("href", "#");
    productCardBasket.classList.add("nav-btn");
    productCardBasket.classList.add("buy-btn");
    let productCardIcon = document.createElement("img");
    productCardIcon.setAttribute("src", "./img/basket.png");
    productCardIcon.classList.add("basket-icon");
    let basketItemPrice;

    productCardBasket.onclick = (event) => {
      let resultSum;
      event.preventDefault();
      basketArray.push(element);
      let counter = 1;
      let basketItem = document.createElement("div");
      basketItem.classList.add("basket-item");
      let basketItemImg = document.createElement("div");
      basketItemImg.classList.add("basket-item-img");
      basketItemImg.style.backgroundImage = `url("${element.thumbnail}")`;
      let basketItemCounter = document.createElement("div");
      basketItemCounter.classList.add("counter-wrapper");
      let basketCounterMinus = document.createElement("span");
      basketCounterMinus.classList.add("counter-minus");
      basketCounterMinus.innerText = "-";

      basketCounterMinus.onclick = () => {
        if (counter) {
          --counter;
          basketCounterValue.innerText = counter;
          basketItemPrice2.innerText =
            counter *
            Math.round(element.price * (1 - element.discountPercentage / 100));
          resultSum -= Math.round(
            element.price * (1 - element.discountPercentage / 100)
          );
          basketSum.innerText = resultSum;
        }
      };

      let basketCounterValue = document.createElement("span");
      basketCounterValue.innerText = counter;
      let basketCounterPlus = document.createElement("span");
      basketCounterPlus.classList.add("counter-plus");
      basketCounterPlus.innerText = "+";

      basketCounterPlus.onclick = () => {
        if (counter < element.stock) ++counter;
        basketCounterValue.innerText = counter;
        basketItemPrice2.innerText =
          counter *
          Math.round(element.price * (1 - element.discountPercentage / 100));
        resultSum += Math.round(
          element.price * (1 - element.discountPercentage / 100)
        );
        basketSum.innerText = resultSum;
      };

      let basketItemText = document.createElement("div");
      basketItemText.classList.add("basket-item-text");
      let basketItemName = document.createElement("span");
      basketItemName.classList.add("basket-item-name");
      basketItemName.innerText = element.title;
      let basketItemBrand = document.createElement("span");
      basketItemBrand.innerText = element.brand;
      basketItemBrand.classList.add("basket-item-brand");
      basketItemPrice = document.createElement("div");
      basketItemPrice.classList.add("basket-item-price");
      let basketItemPrice2 = document.createElement("div");
      basketItemPrice2.classList.add("basket-item-price-multiply");

      basketItemPrice.innerText = Math.round(
        element.price * (1 - element.discountPercentage / 100)
      );

      basketItemPrice2.innerText =
        counter *
        Math.round(element.price * (1 - element.discountPercentage / 100));

      resultSum = basketArray.reduce(
        (accumulator, currentValue) =>
          accumulator +
          Math.round(
            currentValue.price * (1 - currentValue.discountPercentage / 100)
          ),
        0
      );
      basketSum.innerText = resultSum;

      basketItemCounter.append(
        basketCounterMinus,
        basketCounterValue,
        basketCounterPlus
      );
      basketItemText.append(basketItemName, basketItemBrand);
      basketItem.append(
        basketItemImg,
        basketItemText,
        basketItemCounter,
        basketItemPrice,
        basketItemPrice2
      );
      orderList.appendChild(basketItem);
    };

    let productCardBuy = document.createElement("span");
    productCardBuy.innerText = "Buy";
    productCardBasket.appendChild(productCardIcon);
    productCardBasket.appendChild(productCardBuy);
    productCardText.append(
      productCardCategory,
      productCardName,
      productCardBrand,
      productCardPriceBefore,
      productCardPrice,
      productCardRating,
      productCardBasket
    );
    productCardWrapper.append(productCardImg, productCardText);
    productCard.appendChild(productCardWrapper);
    productsList.appendChild(productCard);
    productCardImg.style.backgroundImage = `url("${element.images[0]}")`;
    productCardCategory.innerText = element.category;
    productCardName.innerText = element.title;
    productCardBrand.innerText = element.brand;
    productCardPriceBefore.innerText = `${element.price} $`;
    productCardPrice.innerText = `${(
      element.price *
      (1 - element.discountPercentage / 100)
    ).toFixed(0)} $`;
    for (let i = 1; i <= 5; i++) {
      let productCardRatingStar = document.createElement("li");
      if (i <= Math.floor(element.rating)) {
        productCardRatingStar.style.backgroundImage = "url(./img/star.svg)";
      } else {
        productCardRatingStar.style.backgroundImage = "url(./img/star0.svg)";
      }
      productCardRatingStar.classList.add("rating-star");
      productCardRating.appendChild(productCardRatingStar);
    }
  });
}

function showAllProducts() {
  productsList.innerHTML = "";
  let array = products.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
  showArray(array);
  price1.value = "";
  price2.value = "";
}

window.onload = () => {
  showAllProducts();
};

resetButton.onclick = () => {
  showAllProducts();
};

searchButton.onclick = () => {
  if (price2.value > 0 && price2.value >= price1.value) {
    productsList.innerHTML = "";
    let array = products
      .filter(
        (element) =>
          element.price * (1 - element.discountPercentage * 0.01) >=
            price1.value &&
          element.price * (1 - element.discountPercentage * 0.01) <=
            price2.value
      )
      .sort(
        (a, b) =>
          parseInt(a.price * (1 - a.discountPercentage * 0.01)) -
          parseInt(b.price * (1 - b.discountPercentage * 0.01))
      );
    showArray(array);
  }
};

minToMaxButton.onclick = () => {
  productsList.innerHTML = "";
  let array = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  showArray(array);
};

maxToMinButton.onclick = () => {
  productsList.innerHTML = "";
  let array = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  showArray(array);
};

selectBrand.onclick = () => {
  if (selectBrand.value !== "all") {
    productsList.innerHTML = "";
    let array = products.filter(
      (element) => element.brand === selectBrand.value
    );
    console.log(array);
    showArray(array);
  } else {
    showAllProducts();
  }
};

selectCategory.onclick = () => {
  if (selectCategory.value !== "all") {
    productsList.innerHTML = "";
    let array = products.filter(
      (element) => element.category === selectCategory.value
    );
    showArray(array);
  } else {
    showAllProducts();
  }
};

mainBasket.onclick = () => {
  basketWindow.hidden = false;
};
closeButton.onclick = () => {
  basketWindow.hidden = true;
};
