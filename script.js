//Array of products
let initialProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];

window.addEventListener("load", () => {
  //Loading products in local storage
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (location.pathname === "./index.html") {
    loadIndex();
  }
  if (location.pathname === "./cart.html") {
    loadCart();
  }
});

const loadIndex = () => {
  const cardRef = document.getElementById("card");
  const products = JSON.parse(localStorage.getItem("products"));
  let body = "";

  for (let product of products) {
    body += `<div class="col-4 d-flex justify-content-evenly card-style" >
    <div
    style="background-color:white"
      class="border p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column mh-75"
    >
      <img src="${
        product.thumbnail
      }" alt="image" style="min-width:200px;height:200px" />
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">
    ${product.description.substring(0, 20)}
    </p>
    <p class="fs-4 my-1 mb-2">₹ ${product.price}</p>
  ${displayBtn(product)}
    
    </div>
</div>
</div>`;
  }

  if (cardRef) cardRef.innerHTML = body;
  
};




const displayBtn=(product)=>{
  let cart=[];
  if(localStorage.getItem("cart"))
  cart = JSON.parse(localStorage.getItem("cart"));

  const checkProductAvailablity=cart.find((t)=>t.id===product.id);
  if(checkProductAvailablity && checkProductAvailablity.count>0){
    return `<div class="col-md-3 col-lg-3 col-xl-2 d-flex">
    <div class="input-group mb-3">
    <button class="input-group-text" onclick="modifyCount(${product.id},'-')">-</button>

    <p class="m-2">${checkProductAvailablity.count}</p>
    <button class="input-group-text" onclick="modifyCount(${product.id},'+')">+</button>
  </div>
    </div>`;
  }
else{
  return `<button class="btn btn-success w-100" onClick="addToCart(${product.id})">Add to Cart</button>`;
}

};

loadIndex();
//Add To Cart
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  let product = products.find((product) => product.id === parseInt(id));
  
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  const cartProducts = cart.find((c) => 
    c.id === id);
  if (cartProducts) {
    cart = cart.map((c) => {
      if ((id) === c.id) {
        return { ...c, count: c.count + 1 };
      } else {
        return c;
      }
    });
  } else {
    cart.push({ count: 1, ...product });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount();
  loadIndex();
};

//Loading cart page
const loadCart = () => {
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  const itemsRef = document.getElementById("items");
  let body = "";

  if (cart.length > 0) {
    
    for (let item of cart) {
      body += `<div
      class="row mb-4 d-flex justify-content-between align-items-center"
    >
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          src="${item.thumbnail}"
          class="img-fluid rounded-3"
        />
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">${item.title}</h6>

        
      </div>
      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
      <div class="input-group mb-3">
      <button class="input-group-text" onclick="modifyCount(${
        item.id
      },'-')">-</button>
     
      <p class="m-1">${item.count}</p>
      <button class="input-group-text" onclick="modifyCount(${
        item.id
      },'+')">+</button>
    </div>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">${item.price}</h6>
      </div>
      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
        <button class="text-muted" onclick="removeProduct(${item.id})"
          ><i class="bi bi-x fs-3" ></i
        ></button>
      </div>
     <hr class="my-4" />`;

    }
    
  } else {
    body = `<div class="card" style="width: 18rem;">
  <div class="card-body ">
    <h5 class="card-title">Cart is Empty</h5>
    <h6 class="card-subtitle mb-2 text-muted"><a href="./index.html" class="card-link">Continue Shopping</a></h6>
    
  </div>
</div>`;
  }
  
  if (itemsRef) {
    itemsRef.innerHTML = body;
  }
};
loadCart();
//Remove product from cart
const removeProduct = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const filteredCart = cart.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(filteredCart));
  location.href = "./cart.html";
};

//Modify Count

const modifyCount = (id, operator="+") => {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
let product=cart.find((product)=>product.id===id);

  let findIndex=cart.findIndex((product)=>product.id===id);
  for(let c of cart){
    if (c.id === id) {
          if (operator === "+") {
            cart[findIndex]={...c, count: c.count + 1} ;
          } else if (operator === "-" && c.count!==0) {
            cart[findIndex]={ ...c, count: c.count-1 };
          }
        }
  }
  localStorage.setItem("cart", JSON.stringify(cart)); 
  cart=JSON.parse(localStorage.getItem("cart")); 

  if(product.count===1&& location.pathname==="/cozastore/cart.html")
  {
    removeProduct(id);
  }

  loadCart();
  loadIndex();
  cartCount()
  
};

//Load cart count
const cartCount = () => {
  let cartCountRef=document.getElementById("cartCount")
  let cart = [];
  if (localStorage.getItem("products")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let cartCount = 0;
  for (let c of cart) {
    cartCount += c.count;
  }
  if (cartCount > 0) {
    cartCountRef.innerText= cartCount;
  }
};
