
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

let productData = [];

// Afficher les informations du produit sur la page produit

const fetchProduct = async () => {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((promise) => {
            productData = promise;
            console.log('product Data', productData);

            //product image
            let productImg = document.querySelector(".item__img").innerHTML = `
            <img src="${productData.imageUrl}" alt="${productData.altTxt}">`;

            //product title
            let productTitle = document.getElementById("title").innerText = `${productData.name}`;

            //product price 
            let productPrice = document.getElementById("price").innerText = `${productData.price}`;

            //product description 
            let productDescription = document.getElementById("description").innerText = `${productData.description}`;

            //product options
            for (let i = 0; i < productData.colors.length; i++) {
                let productOption = document.getElementById("colors").innerHTML += `
            <option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
            }


        });

};

fetchProduct();




// Definition de la variable cartButton
let cartButton = document.getElementById("addToCart");

// Ecoute de l'évènement click
cartButton.addEventListener("click", () => {

    // Récupération de ce que contient le local storage
    let productArray = JSON.parse(localStorage.getItem("product"))



    // Définition des variables color et quantity
    let color = document.getElementById("colors").value;
    let quantity = Number(document.getElementById("quantity").value);
    console.log('color', color);
    console.log('quantity', quantity)


    //Création objet JS avec les infos du produit
    let productInfos = {
        id: id,
        color: color,
        quantity: quantity

    }

    // si la couleur ou la quantité n'est pas selectionnée
    if (color == "" || quantity == "") {
        alert("Veuillez spécifier la couleur et la quantité");

        // si le panier est vide on push le nouveau produit 
    } else if (productArray == null) {
        productArray = [];
        productArray.push(productInfos)
        console.log("productArray", productArray);
        localStorage.setItem("product", JSON.stringify(productArray));


        // si le panier contient déjà un produit
    } else {

        const findProduct = productArray.find(product => product.id === id && product.color === color)
        console.log(findProduct)
        if (findProduct != undefined) {

            let newQuantity = Number(findProduct.quantity);
            newQuantity += quantity;
            findProduct.quantity = newQuantity;
            localStorage.setItem("product", JSON.stringify(productArray));

        } else {
            productArray.push(productInfos)
            localStorage.setItem("product", JSON.stringify(productArray));
        }











        /*const productArrayLength = productArray.length
        let isProductHere = false

        for (let i = 0; i < productArrayLength; i++) {
            console.log(i);
            let newQuantity = Number(productArray[i].quantity);
            

            // si les produits ont le même id & la même couleur on incrémente la quantité
            if (productArray[i].id === id && productArray[i].color === color) {
                isProductHere = true
                console.log("block if")
                newQuantity += quantity;
                productArray[i].quantity = newQuantity;
                localStorage.setItem("product", JSON.stringify(productArray));
                productArray = JSON.parse(localStorage.getItem("product"))


                // sinon on push produit en tant que nouveau produit dans le panier
            } 

        }
        if (isProductHere == false) {
            product
        }
        */
    }
});



