//Check the page done loading
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  // Remove Btn
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //change input event
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button"); //fa-cart-shopping
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}
//
function purchaseClicked() {
  alert("Thank you for your purchase :)");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
//get items from the shop
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}
// The fn that add the HTML row
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = document.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart !");
      return;
    }
  }
  var cartRowContents = `<div class="cart-item cart-column">
      
    <img
        class="cart-item-image"
        src="${imageSrc}"
        width="100"
        height="100"
      />
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" />
      
    </div>
    <div class="cart-remove cart-column">
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
      `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem); //apply the change on the remove btn
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged); //apply the change on the input
}

//removing row of item on the click and update the price
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
//input must not be NaN or less then 1 item
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
//Update Cart Total

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", "")); //return the price as number with $ sign
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

// Heart click
var heart = document.querySelectorAll(".fa-heart");
Array.from(heart).map((i) => {
  i.addEventListener("click", () => {
    i.classList.toggle("fa-heart-red");
  });
});
// slider
const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});
// Forms Validation
var username = document.getElementById("username")
var password = document.getElementById("password")
var email = document.getElementById("email")
var emailLebalText = document.getElementById("emailLabel")
var passLebalText = document.getElementById("passLabel")
var nameLebalText = document.getElementById("nameLabel")

username.addEventListener('input',(e)=>{
  var userText =e.target.value
  if (userText.length >= 8) {
    nameLebalText.innerHTML = "Valid Username";
    nameLebalText.style.color = "blue";
  }else{nameLebalText.innerHTML = "Username have at least 8 characters";
  nameLebalText.style.color = "red";}
  if((userText == "username") || (userText =="USERNAME") || (userText =="Username")){
      nameLebalText.innerHTML = "Username cannot be (username)";
      nameLebalText.style.color = "red";
    }
})

email.addEventListener("input", (e) => {
  var inputText = e.target.value

  if (
    inputText.indexOf("@") == -1 ||
    (inputText.indexOf("gmail") == -1 &&
      inputText.indexOf("hotmail") == -1 &&
      inputText.indexOf("outlook") == -1 &&
      inputText.indexOf("aim") == -1 &&
      inputText.indexOf("yahoo") == -1 &&
      inputText.indexOf("icloud") == -1 &&
      inputText.indexOf("protonmail") == -1) ||
    inputText.indexOf(".com") == -1
  ) {
    emailLebalText.innerHTML = "Email is not valid";
    emailLebalText.style.color = "red";
  } else {
    emailLebalText.innerHTML = "Email is valid";
    emailLebalText.style.color = "green";
  }
});
password.addEventListener("input", (e) => {
  var passText = e.target.value;
  if (passText.length > 20) {
    passLebalText.innerHTML = "MAKE SURE YOUR REMEMBER IT!";
    passLebalText.style.color = "brown";
  } else if (passText.length >= 15) {
    passLebalText.innerHTML = "Excellent password";
    passLebalText.style.color = "blue";
  } else if (passText.length >= 10) {
    passLebalText.innerHTML = "Very good password";
    passLebalText.style.color = "green";
  } else if (passText.length >= 5) {
    passLebalText.innerHTML = "Medium password";
    passLebalText.style.color = "orange";
  } else {
    passLebalText.innerHTML = "Poor password";
    passLebalText.style.color = "red";
  }
  if((passText == "password") || (passText =="PASSWORD") || (passText =="Password")){
    passLebalText.innerHTML = "Password cannot be (password)";
    passLebalText.style.color = "red";
  }
});

form.addEventListener("submit", (e) => {
  alert("Thank you for your message ");
});
