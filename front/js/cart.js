
// changer la quantité de produit depuis le panier

function changeQuantity() {

  let productCards = document.getElementsByClassName("cart__item")
  let productCardsArray = Array.from(productCards);

  //boucle for sur les cartes produits

  for (let i = 0; i < productCardsArray.length; i++) {

    const qtyInput = productCardsArray[i].getElementsByClassName("itemQuantity")[0]


    qtyInput.addEventListener('input', function () {
      //Récupération du localStorage
      let productArray = JSON.parse(localStorage.getItem("product"));

      //Définition des variables id & color
      let id = productCardsArray[i].getAttribute("data-id")
      let color = productCardsArray[i].getAttribute("data-color")
      console.log(productCardsArray[i].getAttribute("data-id"))
      console.log(color)

      //Recherche du produit selectionné dans le localStorage
      const findProduct = productArray.find(product => product.id === id && product.color === color)
      const newQty = productCardsArray[i].getElementsByClassName("itemQuantity")[0].value;
      console.log("newQty", qtyInput)
      //Remplacement de la quantité et mise à jour du localStorage
      findProduct.quantity = newQty
      console.log("qty2", findProduct.quantity)
      localStorage.setItem("product", JSON.stringify(productArray));

    })

  }





}

// Création de la fonction deleteProduct
function deleteProduct() {

  let productCards = document.getElementsByClassName("cart__item")
  let productCardsArray = Array.from(productCards);

  //Boucle for sur les cartes produits
  for (let i = 0; i < productCardsArray.length; i++) {

    // Définition de la variable deleteButton
    const deleteButton = productCardsArray[i].getElementsByClassName("deleteItem")[0];

    // Ecoute de l'évènement "click" sur les deleteButtons
    deleteButton.addEventListener("click", function (dlt) {

      //Récupération du localStorage
      let productArray = JSON.parse(localStorage.getItem("product"));

      //Définition des variables id & color
      let id = Number(productCardsArray[i].getAttribute("data-id"))
      let color = productCardsArray[i].getAttribute("data-color")

      // Retrait du  produit concerné du localStorage & page reload
      const newProductArray = productArray.filter(product => product.id != id && product.color != color)
      localStorage.setItem("product", JSON.stringify(newProductArray));
      window.location.reload();

    })

  }
}


function displayProduct() {
  // Récupération des données du localStorage et création du tableau
  let productArray = JSON.parse(localStorage.getItem("product"));
  console.log("productArray", productArray);


  // si le panier est vide
  if (productArray == null || productArray.length == 0) {
    console.log("Le panier est vide")
    // le h1 affiche "Votre panier est vide"
    let cartTitle = document.querySelector("#cartAndFormContainer >h1")
    cartTitle.innerText += " est vide"


    // si le panier contient des produits   
  } else {
    console.log('le panier contient des produits')
    for (let i = 0; i < productArray.length; i++) {
      let id = productArray[i].id
      console.log(id)

      // call API pour récupérer le nom et les photos

      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((productData) => {
          console.log('Call API ok', productData)

          // Ajout de <artcile> à la page panier
          document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${productData._id}" data-color="${productArray[i].color}">
        <div class="cart__item__img">
          <img src="${productData.imageUrl}" alt="${productData.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productData.name}</h2>
            <p>${productArray[i].color}</p>
            <p>${productData.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productArray[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`

          deleteProduct();
          changeQuantity();

        })
        .catch(err => console.log(err))

    }
  }

}

displayProduct();




// Supprimer un produit du panier au clic sur le bouton "Supprimer"









