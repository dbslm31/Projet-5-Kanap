fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (products) {
        console.log(products);

        //constante pour sélectionner l'élément sur lequel on souhaite travailler 

        const items = document.getElementById('items');

        // boucle qui permet de selectionner les éléments de l'API  

        for (let i = 0; i < products.length; i++) {
            const itemsCards = `<a href="./product.html?id=${products[i]._id}"> 
                <article> 
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                <h3 class="productName">${products[i].name}</h3>
                <p class="productDescription">${products[i].description}</p>
                </article>
                </a>`;
            items.innerHTML += itemsCards;
        }

    })
    .catch(function (err) {
        // Une erreur est survenue
    });




