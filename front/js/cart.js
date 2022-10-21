//////////////////////////// CHANGER LA QUANTIÉ D'UN PRODUIT ////////////////////////////


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
      totalAll();

    })

  }
}

///////////////////////////// SUPPRIMER UN PRODUIT ///////////////////////////////////


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

//////////////////////////////// AFFICHER LE TOTAL SUR LA PAGE PANIER //////////////////////////////////


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




//////////////////////////// AFFICHER LES PRODUITS DANS LE PANIER ///////////////////////////



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


////////////////////////////// VERIFIER LES INFOS DU FORMULAIRE ///////////////////////////////////////////


// Récupérer les informations contenues dans le formulaire
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")
console.log("email", email)
console.log("firstName", firstName)

// Définition des regex 
let namesRegex = /^[a-zA-Zèé\-]+$/
let addressRegex = /^[0-9]{1,3}[a-zA-Zèé\-'\s]+$/
let emailRegex = /^[a-zA-Z\.-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/

// fonction de verification du prénom
function formVerif(regex, input, errorId, errorMsg) {
  let regexResult = regex.test(input)

  if (regexResult == true) {
    document.getElementById(errorId).innerText = ""
    return true

  } else {
    document.getElementById(errorId).innerText = errorMsg
    return false

  }
}

function inputTxt(inputName, regex, errorId, errorMsg) {
  inputName.addEventListener('input', function () {
    formVerif(regex, inputName.value, errorId, errorMsg);
  })
}

inputTxt(firstName, namesRegex, "firstNameErrorMsg", "Le prénom ne doit contenir que des lettres");
inputTxt(lastName, namesRegex, "lastNameErrorMsg", "Le nom ne doit contenir que des lettres");
inputTxt(address, addressRegex, "addressErrorMsg", "Le format d'adresse est incorrect");
inputTxt(city, namesRegex, "cityErrorMsg", "La ville est incorrecte");
inputTxt(email, emailRegex, "emailErrorMsg", "L'email est incorrect");



//////////////////////////////////////// VALIDER LA COMMANDE  ///////////////////////////



//Récupération des informations de commande

//addEventListener onclick sur le bouton  "commander"

let orderBtn = document.getElementById('order')
console.log('orderBtn', orderBtn)

orderBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let firstNameResult = formVerif(namesRegex, firstName.value, "firstNameErrorMsg", "Le prénom ne doit contenir que des lettres")
  let lastNameResult = formVerif(namesRegex, lastName.value, "lastNameErrorMsg", "Le nom ne doit contenir que des lettres")
  let addressResult = formVerif(addressRegex, address.value, "addressErrorMsg", "Le format d'adresse est incorrect")
  let cityResult = formVerif(namesRegex, city.value, "cityErrorMsg", "La ville est incorrecte")
  let emailResult = formVerif(emailRegex, email.value, "emailErrorMsg", "L'email est incorrect")

  if (firstNameResult && lastNameResult && addressResult && cityResult && emailResult) {
    console.log("regex OK")

    // Récupération id, couleur et qty produits
    let productArray = JSON.parse(localStorage.getItem("product"));

    function getIdProduct(productArray) {
      let idProduct = [];
      for (let i = 0; i < productArray.length; i++) {
        id = productArray[i].id;
        idProduct.push(id);
      }
      return idProduct;
    }
    let productId = getIdProduct(productArray);

    //Création de l'objet JS avec les infos de commandes
    let orderInfos = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
      products: productId
    }

    //Envoie des infos de commandes vers l'API
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfos)

    }).then((res) => res.json())
      .then((promise) => {
        let newOrder = promise

        //Récupération de l'ID de commande
        let orderId = newOrder.orderId

        //suppression du localStorage
        localStorage.clear();

        // Redirection vers la page confirmation
        window.location = "confirmation.html?orderid=" + orderId







      })
      .catch(err => console.log(err))












  } else {
    alert("Veuillez vérifier les informations du formulaire");
    formVerif();
  }

})










