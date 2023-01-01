# Projet5_Kanap
Fifth Project of OpenClassrooms training 
<br>2022, July.

<h2> OBJECTIVES </h2>

Build a e-commerce website with Javascript

<h2> CONTEXT </h2>

Kanap is a brand of sofas that sells its products exclusively from its shop. <br>
Today, it would like to have an e-commerce platform in addition to its physical shop to sell its products on the Internet.

<h2> SKILLS </h2>

<ul>
<li>Dynamically integrate the elements of the API into the various pages of the site</li>
<li>Set up an acceptance testing plan</li>
</ul>

<h2> TECHNICAL & FONCTIONNAL SPECIFICATIONS </h2>

<h3> HOME PAGE </h3>
This page presents all the products returned by the API.
For each product, you must display its image, as well as its name and the beginning of its description.
By clicking on the product, the user will be redirected to the product page to view it in more detail.


<h3> PRODUCT PAGE </h3>
This page presents a single product; it will have a dropdown menu allowing the user to choose a customization option, as well as an input to enter the quantity. These elements must be taken into account in the cart.

<h3> CART PAGE </h3>
On this page, the user will be able to modify the quantity of a product in their cart; at this point, the total of the cart must be updated.
The user will also have the option to delete a product from their cart, so the product must disappear from the page.
User inputs must be analyzed and validated to check the format and type of data before sending to the API. 

<h3> CONFIRMATION PAGE </h3>
the user must see their order number displayed. Care must be taken to ensure that this number is not stored anywhere.


### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.
