var productname = document.querySelector("#productname");
var productprice = document.querySelector("#productprice");
var productcat = document.querySelector("#productcat");
var productdesc = document.querySelector("#productdesc");
var productimg = document.querySelector("#productimg");
var alertmodal = document.getElementById("staticBackdrop");
var closeBtn = document.getElementById("closeBtn");
var productlist = [];
var addBtn = document.querySelector("#add-btn");
var updateBtn = document.querySelector("#update-btn");
var currentIndex;
if (localStorage.getItem("product") != null) {
  productlist = JSON.parse(localStorage.getItem("product"));
  display(productlist);
}

addBtn.addEventListener("click", function () {
  if (validated() == true) {
    var product = {
      name: productname.value,
      price: productprice.value,
      cat: productcat.value,
      desc: productdesc.value,
      image: `images/${productimg.files[0]?.name}`,
    };
    productlist.push(product);
    displayNone();
    display(productlist);
    storage();
    removeClasses();
  } else {
    alertModal();
  }
});

function display(list) {
  box = ``;
  for (i = 0; i < list.length; i++)
    box += `
  <div id="border-product" class="col-12 col-lg-3 rounded-4 overflow-hidden m-2 bg-black">
  <div>
  <h3 class="title text-center">PRODUCT</h3>
  <h3 class="h3-display">name : ${list[i].name}</h3>
  <h3 class="h3-display">price : ${list[i].price}</h3>
  <h3 class="h3-display">cat : ${list[i].cat}</h3>
  <h3 class="h3-display">desc : ${list[i].desc}</h3>
  </div>
  <div>
  <img src="${list[i].image}" alt = "imag" ></img>
  </div>
  <div class="text-center m-3">
  <button onclick="deleteproduct(${i})" class="delete btn px-2">delete</button>
  <button onclick="getupdateproduct(${i})" class="update btn px-2">update</button>
</div>
</div>`;
  document.querySelector("#my-data").innerHTML = box;
}

function displayNone(configration) {
  productname.value = configration ? configration.name : null;
  productprice.value = configration ? configration.price : null;
  productcat.value = configration ? configration.cat : null;
  productdesc.value = configration ? configration.desc : null;
}

function deleteproduct(i) {
  productlist.splice(i, 1);
  storage();
  display(productlist);
}

function getupdateproduct(i) {
  displayNone(productlist[i]);
  currentIndex = i;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateProduct() {
  productlist[currentIndex].image = productimg.value;
  productlist[currentIndex].name = productname.value;
  productlist[currentIndex].price = productprice.value;
  productlist[currentIndex].cat = productcat.value;
  productlist[currentIndex].desc = productdesc.value;
  productlist[currentIndex].image = `images/${productimg.files[0]?.name}`;
  display(productlist);
  storage();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  displayNone();
}

function storage() {
  localStorage.setItem("product", JSON.stringify(productlist));
}

function search(searchValue) {
  var searchItems = [];
  for (i = 0; i < productlist.length; i++) {
    if (productlist[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      searchItems.push(productlist[i]);
    }
  }
  display(searchItems);
}

function removeClasses() {
  if (productname.value == "") {
    productname.classList.remove("is-valid");
    productname.classList.remove("is-invalid");
  }
  if (productprice.value == "") {
    productprice.classList.remove("is-valid");
    productprice.classList.remove("is-invalid");
  }
  if (productcat.value == "") {
    productcat.classList.remove("is-valid");
    productcat.classList.remove("is-invalid");
  }
  if (productdesc.value == "") {
    productdesc.classList.remove("is-valid");
    productdesc.classList.remove("is-invalid");
  }
}

function validaiton(product) {
  var productRegex = {
    productname: /^[A-Za-z0-9_-]{3,15}$/,
    productprice: /^[1-9][0-9][0-9][0-9][0-9]$/,
    productcat: /^[A-Za-z0-9_\s]{3,}$/,
    productdesc: /^[A-Za-z0-9_\s]{3,}$/,
  };
  regex = productRegex[product.id].test(product.value);

  if (regex == true) {
    product.classList.add("is-valid");
    product.classList.remove("is-invalid");
    return true;
  } else {
    product.classList.add("is-invalid");
    product.classList.remove("is-valid");
    return false;
  }
}

function validated() {
  var productnameRegex = /^[A-Za-z0-9_-]{3,15}$/;
  var productpriceRegex = /^[1-9][0-9][0-9][0-9][0-9]$/;
  var productcatRegex = /^[A-Za-z0-9_\s]{3,}$/;
  var productdescRegex = /^[A-Za-z0-9_\s]{3,}$/;

  if (productnameRegex.test(productname.value) == false) {
    return false;
  } else if (productpriceRegex.test(productprice.value) == false) {
    return false;
  } else if (productcatRegex.test(productcat.value) == false) {
    return false;
  } else if (productdescRegex.test(productdesc.value) == false) {
    return false;
  }
  return true;
}

function alertModal() {
  alertmodal.classList.remove("d-none");
  alertmodal.classList.add("d-block");
  alertmodal.classList.add("bg-black");
  alertmodal.classList.add("bg-opacity-75");
}

function closeModal() {
  alertmodal.classList.add("d-none");
  alertmodal.classList.remove("d-block");
}
