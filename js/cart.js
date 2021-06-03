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
// Récupération des valeurs du formulaire
const formValues = {
  Nom: document.querySelector('#form_nom').value,
  Prénom: document.querySelector('#form_prenom').value,
  Adresse: document.querySelector('#form_adresse').value,
  Ville: document.querySelector('#form_ville').value,
  CodePostal: document.querySelector('#form_codep').value,
  Email : document.querySelector('#form_email').value
}

// "^" = début de la séquence, "$" = fin de la séquence
// .test = Une méthode de l'objet RegExp testant la présence d'une correspondance dans une chaîne de caractères. Elle renvoie true ou false.
function nomControle() {
  if (/^[A-Za-z]{3,20}$/.test(formValues.Nom)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
function prenomControle() {
  if (/^[A-Za-z]{3,20}$/.test(formValues.Prénom)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
function adresseControle() {
  if (/^[A-Za-z0-9\u00C0-\u00FF\s-]{5,50}$/.test(formValues.Adresse)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
function villeControle() {
  if (/^[A-Za-z]{3,20}$/.test(formValues.Ville)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
function codepControle() {
  if (/^[0-9]{5}$/.test(formValues.CodePostal)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
function emailControle() {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.Email)) {
    console.log("ok")
    return true
    
  } else {
    console.log("ko")
    return false
  }
}
console.log(nomControle())
  if (nomControle() && prenomControle() && adresseControle() && villeControle() && codepControle() && emailControle() === true) {
    console.log('ok1')
  // Mettre l'objet 'formValues' dans le localStorage
  localStorage.setItem('formValues', JSON.stringify(formValues))
  } else {
    console.log('ko1')
  }

// Mettre les values du formulaire et les produits dans un objet à envoyer vers le serveur
const aEnvoyer = {
  cartLocalStorage,
  formValues
}
console.log(aEnvoyer)
})

//Mettre le contenu du local storage dans le formulaire
// Prendre la key dans la local storage
const dataLocalStorage = localStorage.getItem('formValues')
// Convertir la chaîne de caratères en objet javascript
const dataLocalStorageParse = JSON.parse(dataLocalStorage)
// Fonction pour que le champs du formulaire soit rempli par les données du local storage
// Avec paramétres (querySelector et objet)
function remplirChampsVideForm (querySelector, objet){
  document.querySelector(`#${querySelector}`).value = dataLocalStorageParse[objet]
}
remplirChampsVideForm('form_nom', 'Nom')
remplirChampsVideForm('form_prenom', 'Prénom')
remplirChampsVideForm('form_adresse', 'Adresse')
remplirChampsVideForm('form_ville', 'Ville')
remplirChampsVideForm('form_codep', 'CodePostal')
remplirChampsVideForm('form_email', 'Email')

