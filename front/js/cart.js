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
    for (i = 0; i < productArray.length; i++) {
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${productArray[i].id}" data-color="${productArray[i].color}">
        <div class="cart__item__img">
          <img src="${productArray[i].image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productArray[i].name}</h2>
            <p>${productArray[i].color}</p>
            <p>${productArray[i].price} €</p>
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

    }
}




// Supprimer un produit du panier au clic sur le bouton "Supprimer"

// Définition de la variable deleteButton
let deleteBtn = document.querySelectorAll(".deleteItem");

// Selectionner chaque bouton 'supprimer' individuellement
for (i = 0; i < deleteBtn.length; i++) {
    let deleteItem = deleteBtn[i];

    //Ecoute de l'évènement click sur chaque élément de deleteItems
    deleteItem.addEventListener("click", (e) => {
        e.preventDefault()

        console.log("productArray", productArray)

        //Définition du produit à supprimer
        for (j = 0; j < productArray.length; j++) {
            let idToDelete = productArray[j].id;
            let colorToDelete = productArray[j].color;

            // Recherche du produit à supprimer dans le localStorage
            productArray = productArray.filter(product => product.id === idToDelete || product.color === colorToDelete);
            console.log("productArrayDeleted", productArray)
            localStorage.setItem("product", JSON.stringify(productArray));

        }
        // Rechargement de la page
        location.reload();


    });

}




// Changer la quantité d'un produit depuis la page Panier
