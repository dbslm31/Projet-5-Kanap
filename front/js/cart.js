// Récupération des infos sur l'API
const fetchProduct = async () => {
    fetch(`http://localhost:3000/api/products`)
        .then((res) => res.json())
        .then((promise) => {
        })
}

