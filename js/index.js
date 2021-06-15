let categories = ["Teddies"];
let main = document.getElementById("main");

//  Fonction chiffrePanier (pour afficher le nombre d'articles sur le bouton panier)
chiffrePanier();

// Création d'une boucle pour chaque catégories
for (let i = 0; i < categories.length; i++) {
  // Récupération des données de l'api avec la méthode fetch
  fetch("http://localhost:3000/api/" + categories[i])
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Pour chaque catégories, création d'une balise <h2> 
      let section = document.createElement("section");
      section.innerHTML =
        "<h2>" +
        categories[i] +
        "</h2>" +
        "<div class='content d-flex flex-wrap justify-content-center'>" +
        "</div>";

      // Création d'une boucle pour chaque produits récupérés dans le tableau dans l'api
      for (let x = 0; x < data.length; x++) {
        console.log(data[x].name);
        let nomProduit = data[x].name;
        let imgProduit = data[x].imageUrl;
        let idProduit = data[x]._id;
        let prixProduit = data[x].price;
        let description = data[x].description;
        
        // Pour chaque produits, création d'une carte pour afficher l'image et les informations
        let div = document.createElement("div");
        div.className = "m-3 full_card";
        div.innerHTML = 
                  `
                    <div class="card">
                        <img class="card-img-top size_img" src="${imgProduit}" alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title"><a href="product.html?${idProduit}">${nomProduit}</a></h4>
                            <p class="card-text">${description}</p>
                            <p class="btn btn-info btn-block">${prixProduit / 100}€</p>
                        </div>
                    </div>
                  `;
        section.getElementsByClassName("content")[0].appendChild(div);
      }
      return section;
    })
    .then((section) => {
      main.appendChild(section);
    });
}
