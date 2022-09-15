// Récupération des infos sur l'API
const response = await fetch('http://localhost:3000/api/products');
const products = await response.json();

// Transformation des produits en JSON
const productsValue = JSON.stringify(products);

//Stockage des info dans LocalStorage
window.localStorage.setItem("products", productsValue);

