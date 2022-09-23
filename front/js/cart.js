



// Récupération des données du localStorage et création du tableau
let productArray = [JSON.parse(localStorage.getItem("product"))];
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
    // on affiche les infos du produits dans le panier
    /*document.getElementById("cart__items").innerHTML = `<article class="cart__item" data-id="${productData._id}" data-color="${productData._color}">
    <div class="cart__item__img">
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productData.name}</h2>
        <p>${productDatacolorss}</p>
        <p>${productData.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`*/

}
