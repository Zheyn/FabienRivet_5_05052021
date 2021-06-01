let cartLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(cartLocalStorage);
let containerCart = document.querySelector(".container_cart");
let prixTotalHtml = document.querySelector(".prix_total");
let prixTotalCalcul = [];

if (cartLocalStorage === null) {
  document.querySelector('.numero_panier').innerText = 0
  containerCart.innerHTML = `
  <div>Panier vide</div>
  `
} else {
  // Faire apparaître le formulaire si il y a un produit ou + dans le panier
  const formCartNone = document.querySelector('.form_cart-none')
  formCartNone.classList.remove("form_cart-none")

  for (let i = 0; i < cartLocalStorage.length; i++) {
    let id = cartLocalStorage[i].idProduit;
    console.log(id);
  
    fetch(`http://localhost:3000/api/teddies/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let structureCart = document.createElement("figure");
        structureCart.innerHTML =
          `
        <div class="container mt-5 mb-5">
              <div class="d-flex justify-content-center row ra">
                  <div class="col-md-8">
                      <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                          <div class="mr-1"><img class="rounded" src="` +
          cartLocalStorage[i].imgProduit +
          `" width="150"></div>
                          <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">` +
          cartLocalStorage[i].nomProduit +
          `</span>
                              <div class="d-flex flex-row product-desc">
                                  <div class="color"><span class="text-grey">Couleur: </span><span class="font-weight-bold">` +
          cartLocalStorage[i].couleurProduit +
          `</span></div>
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
                              <h5 class="text-grey mt-1 mr-1 ml-1">1</h5><i class="fa fa-plus text-success"></i>
                          </div>
                          <div>
                              <h5 class="text-grey">` +
          cartLocalStorage[i].prixProduit +
          `€</h5>
                          </div>
                          <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
                      </div>
                  </div>
              </div>
          </div>
        `;
        containerCart.appendChild(structureCart);
      });
  }
  
  for (let p = 0; p < cartLocalStorage.length; p++) {
    let prixDesProduits = cartLocalStorage[p].prixProduit;
    prixTotalCalcul.push(prixDesProduits);
    console.log(prixTotalCalcul);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let prixTotal = prixTotalCalcul.reduce(reducer, 0);
  console.log(prixTotal);
  prixTotalHtml.innerHTML = `
      <div class="container mt-5 mb-5">
              <div class="d-flex justify-content-center row ra">
                  <div class="col-md-8">
                      <div class="d-flex flex-row justify-content-end align-items-center p-2 bg-white mt-4 px-3 rounded">
                          <div>Total TTC: ${prixTotal}€</div>
                      </div>
                  </div>
              </div>
          </div>
      `;
      // Ajoute le chiffre sur la panier
      let numeroCart = cartLocalStorage.length
      document.querySelector('.numero_panier').innerText = numeroCart
      console.log(numeroCart)
}

const btnForm = document.querySelector('.btn_form')
btnForm.addEventListener('click', (e) => {
  e.preventDefault()
localStorage.setItem('Nom', document.querySelector('#form_nom').value)
localStorage.setItem('Prénom', document.querySelector('#form_prenom').value)
localStorage.setItem('Adresse', document.querySelector('#form_adresse').value)
localStorage.setItem('Ville', document.querySelector('#form_ville').value)
localStorage.setItem('Code postal', document.querySelector('#form_codep').value)
console.log(document.querySelector('#form_nom').value)
console.log(document.querySelector('#form_prenom').value)
console.log(document.querySelector('#form_adresse').value)
console.log(document.querySelector('#form_ville').value)
console.log(document.querySelector('#form_codep').value)
})
