
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


      //Recherche du produit selectionné dans le localStorage
      const findProduct = productArray.find(product => product.id === id && product.color === color)
      const newQty = productCardsArray[i].getElementsByClassName("itemQuantity")[0].value;

      //Remplacement de la quantité et mise à jour du localStorage
      findProduct.quantity = newQty

      localStorage.setItem("product", JSON.stringify(productArray));
      window.location.reload();

    })

  }
}




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




// Affichage du total sur la page panier
function totalAll() {

  let productArray = JSON.parse(localStorage.getItem("product"));
  let totalQty = 0
  let totalPricePerItem = 0
  let totalPrice = 0

  for (i = 0; i < productArray.length; i++) {
    //Définition de la quantité totale
    let id = productArray[i].id
    let productQty = Number(productArray[i].quantity);
    totalQty += productQty


    console.log("qty", productQty)
    // call API pour récupérer le prix

    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((productData) => {

        //Définition du prix total
        let productPrice = productData.price;
        totalPricePerItem = productPrice * productQty
        totalPrice += totalPricePerItem


        ///Affichage de la quantité totale et  du prix du total
        document.getElementById("totalQuantity").innerHTML = totalQty
        document.getElementById("totalPrice").innerHTML = totalPrice

      })


  }


}
totalAll();












function displayProduct() {
  // Récupération des données du localStorage et création du tableau
  let productArray = JSON.parse(localStorage.getItem("product"));



  // si le panier est vide
  if (productArray == null || productArray.length == 0) {
    // le h1 affiche "Votre panier est vide"
    let cartTitle = document.querySelector("#cartAndFormContainer >h1")
    cartTitle.innerText += " est vide"


    // si le panier contient des produits   
  } else {
    for (let i = 0; i < productArray.length; i++) {
      let id = productArray[i].id


      // call API pour récupérer le nom et les photos

      fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((productData) => {


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





// Récupérer les informations contenues dans le formulaire
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")
console.log("email", email)
console.log("firstName", firstName)

// Définition des regex 
let namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
let adressRegex = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/g
let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/


//Définition de l'objet JS avec les infos de commandes
let orderInfos = {
  prénom: firstName,
  nom: lastName,
  adresse: address,
  ville: city,
  email: email
}

console.log("orderInfos", orderInfos)

// fonction de verification du nom
function firstNameVerif() {
  console.log("salut")
  let firstNameTest = namesRegex.test(firstName.value)
  console.log("firstNameTest", firstNameTest)
  if (firstNameTest == true) {
    ""
    return true;

  } else {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg").innerText = "Ne peut contenir que des lettres"
    return false;
  }
}


firstName.addEventListener('input', function () {
  console.log("yoooo")
  firstNameVerif();
})











