const product = window.location.search.split("?").join("");
console.log(product);

let productData = [];

const fetchProduct = async () => {
    fetch(`http://localhost:3000/api/products/${product}`)
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




