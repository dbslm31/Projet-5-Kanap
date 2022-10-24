const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("orderid");

const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

