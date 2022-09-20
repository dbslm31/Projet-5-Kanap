
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

            addToCart(productData);
        });

};

fetchProduct();


const addToCart = () => {

    // Definition de la variable cartButton
    let cartButton = document.getElementById("addToCart");

    // Ecoute de l'évènement click
    cartButton.addEventListener("click", () => {

        // Récupération de ce que contient le local storage
        let productArray = JSON.parse(localStorage.getItem("product"))


        // Définition des variables color et quantity
        let color = document.getElementById("colors").value;
        let quantity = document.getElementById("quantity").value;
        console.log('color', color);
        console.log('quantity', quantity)

        //Création objet JS avec les infos du produit
        let productInfos = {
            id: id,
            color: color,
            quantity: quantity

        }


        // si le panier est vide, on push le produit dans le localStorage
        if (productArray == null) {
            productArray = [];
            productArray.push(productInfos)
            console.log("productArray", productArray);
            localStorage.setItem("product", JSON.stringify(productArray))

            // si le panier n'est pas vide    
        } else if (productArray != null) {


            for (i = 0; i < productArray.length; i++) {
                console.log('test')

                //si le produit (id & color) est déjà dans le panier on incrémente quantity
                if (productArray[i].id === id && productArray[i].color === color) {
                    //transforme les strings en numbers
                    let newQuantity = Number(productArray[i].quantity);
                    let oldQuantity = Number(quantity);
                    newQuantity += oldQuantity;
                    productArray[i].quantity = newQuantity;
                    console.log(productArray[i].quantity)
                    localStorage.setItem("product", JSON.stringify(productArray))
                    productArray = JSON.parse(localStorage.getItem("product"))

                    //si le produit n'est pas djà présent dans le panier    
                } else {
                    productArray.push(productInfos);
                    localStorage.setItem("product", JSON.stringify(productArray))
                    JSON.parse(localStorage.getItem("product"))

                }
            }


            // sinon on ajoute le produit


        }


    });
    return (productArray = JSON.parse(localStorage.getItem("product")));
}
