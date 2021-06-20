// Pastille "Nombre d'article" sur le bouton panier
let cartLocalStorage = JSON.parse(localStorage.getItem("products"));
    if (cartLocalStorage === null) {
        document.querySelector('.numero_panier').innerText = 0
      }else{
        document.querySelector('.numero_panier').innerText = cartLocalStorage.length
      }

// Récupération de l'id dans l'url
/*search	La partie de l'URL qui suit le symbole « ? », avec ce symbole inclus*/
const urlid = window.location.search;
console.log(urlid);

// Suppression du "?" avec la méthode slice
const id = urlid.slice(1);
console.log(id);

let card = document.querySelector("img");
let name1 = document.querySelector(".name1");
let description = document.querySelector(".description");
let price = document.querySelector(".price");
let color = document.querySelector(".colors");
let optionColor = document.querySelector(".option");
let btn = document.querySelector(".btn");
let titleProduit = document.querySelector('title')

fetch(`http://localhost:3000/api/teddies/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Injection des donneés du produit dans le code HTML
    console.log(data);
    card.src = data.imageUrl;
    name1.innerText = data.name;
    description.innerText = data.description;
    price.innerText = data.price / 100 + "€";
    titleProduit.innerText = data.name;
    
    // Ajout de l'option couleur 
    let colors = data.colors;
    for (let i = 0; i < colors.length; i++) {
      console.log(colors[i]);
      let option = document.createElement("option");
      option.setAttribute("color", `${colors[i]}`);
      const btnValue = option.color;
      option.innerHTML = `<option value="${btnValue}">${colors[i]}</option>`;
      optionColor.appendChild(option);
      console.dir(optionColor);
    }
    // Envoyer les données des produits au clic du bouton dans le local storage
    btn.addEventListener("click", (e) =>{
      e.preventDefault();
      const choixForm = optionColor.value
      let cartStorage = {
        nomProduit: data.name,
        imgProduit: data.imageUrl,
        idProduit: data._id,
        prixProduit: data.price / 100,
        couleurProduit: choixForm
      };
      console.log(cartStorage)
      let cartLocalStorage = JSON.parse(localStorage.getItem("products"));
      if (cartLocalStorage) {
        cartLocalStorage.push(cartStorage);
        localStorage.setItem("products", JSON.stringify(cartLocalStorage));
      } else {
        cartLocalStorage = [];
        cartLocalStorage.push(cartStorage);
        localStorage.setItem("products", JSON.stringify(cartLocalStorage));
        console.log(cartLocalStorage)
      }
      let numeroCart = cartLocalStorage.length
        document.querySelector('.numero_panier').innerText = numeroCart
        console.log(numeroCart)
    })
  });