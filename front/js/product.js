
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

// Ajouter le produit au panier lorsque l'utilisateur clique sur le boutton

let cartButton = document.getElementById("addToCart");

cartButton.addEventListener('click', function () {

});





