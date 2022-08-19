getProducts()

async function getProducts() {
    let products = await fetch("http://localhost:3000/api/products");
    console.log("Les produits ont été importés")
    return product.js;
} 