const socket = io();
const productList = document.getElementById("productList");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

//agregar productos
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  await fetch("/realTimeProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, price, description }),
  });

  addForm.reset();
});

//recibir los productos

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  deleteForm.reset();
});

socket.on("products", (products) => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">ID: ${product.id}</p>
          <p class="card-text">${product.description}</p>
          <p class="card-text">$${product.price}</p>
        </div>
      `;
    productList.appendChild(card);
  });
});
