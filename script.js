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

  if (location.pathname === "/index.html") {
    loadIndex();
  }
  if (location.pathname === "/cart.html") {
    loadCart();
  }
  console.log(location.pathname);
});

const loadIndex = () => {
  const cardRef = document.getElementById("card");
  const products = JSON.parse(localStorage.getItem("products"));
  let body = "";
  //   const para = document.createElement("div");
  //   para.classList.add("row ");
  //   for (let product of products) {
  //     // Create element:

  //     body += `<div class="col-3 d-flex mt-4 ">
  //     <div
  //       style="background-color:white"
  //        class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column mh-75"
  //      >
  //  <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
  //   <div class="card-body">
  //     <h5 class="card-title">${product.title}</h5>
  //     <p class="card-text">
  //     ${product.description}
  //     </p>
  //     <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
  //     <button class="btn btn-success" onClick="addToCart(${product.id})">Add to Cart</button>
  //   </div>
  // </div>
  // </div>`;
  //   }
  //   para.innerHTML = body;
  //   // Append to another element:
  //   cardRef.appendChild(para);

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
    ${product.description}
    </p>
    <p class="fs-4 my-1 mb-2">₹ ${product.price}</p>
   
    <button class="btn btn-success w-100" onClick="addToCart(${
      product.id
    })">Add to Cart</button>
    
    </div>
</div>
</div>`;
  }
  cardRef.innerHTML = body;
};

//Add To Cart
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  let product = products.find((product) => product.id === parseInt(id));
  let cart = [];
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  const cartProducts = cart.find((c) => {
    c.id === parseInt(id);
  });
  if (cartProducts) {
    cart = cart.map((c) => {
      if (parse(id) === c.id) {
        return { ...c, count: c.count + 1 };
      } else {
        return c;
      }
    });
  } else {
    cart.push({ count: 1, ...product });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
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
      body += `
    <div
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
      <button class="input-group-text">-</button>
      <input type="text" class="form-control" value="${item.count}">
      <button class="input-group-text">+</button>
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
  itemsRef.innerHTML = body;
};

//Remove product from cart
const removeProduct=(id)=>{
  const products = JSON.parse(localStorage.getItem("products"));
  console.log(products);
  const product=products.filter((product)=>product.id!==id);
  localStorage.setItem("products",JSON.stringify(product));
  console.log(product);
  location.href="./cart.html";
}


