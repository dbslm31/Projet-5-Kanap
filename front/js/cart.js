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

      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((productData) => {
          console.log('Call API ok', productData)


          document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${productData.id}" data-color="${productArray[i].color}">
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
        })
        .catch(err => console.log(err))

    }
  }

}

displayProduct();




// Supprimer un produit du panier au clic sur le bouton "Supprimer"
function deleteProduct() {

  // Supprimer un produit du panier au clic sur le bouton "Supprimer"

  // Définition de la variable deleteButton
  console.log("deleteButtons", document.getElementsByClassName("deleteItem"))
  const deleteButtons = document.getElementsByClassName("deleteItem");
  let dltArray = Array.from(deleteButtons)
  console.log("dltArray", dltArray)


}
deleteProduct();




// Changer la quantité d'un produit depuis la page Panier

/*function changeQuantity() {
  const qtyInputs = document.getElementsByName("itemQuantity");
  console.log(qtyInputs);

  // convert NodeList to  Array 
  let qtyArray = Array.from(qtyInputs)
  console.log("ArrayQty", qtyArray)





}

changeQuantity();*/

