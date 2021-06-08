let categories = ["Teddies"];
let main = document.getElementById("main");
chiffrePanier();
for (let i = 0; i < categories.length; i++) {
  fetch("http://localhost:3000/api/" + categories[i])
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let section = document.createElement("section");
      section.innerHTML =
        "<h2>" +
        categories[i] +
        "</h2>" +
        "<div class='content row d-flex justify-content-center'>" +
        "</div>";
      for (let x = 0; x < data.length; x++) {
        console.log(data[x].name);
        let nomProduit = data[x].name;
        let imgProduit = data[x].imageUrl;
        let idProduit = data[x]._id;
        let prixProduit = data[x].price;
        let description = data[x].description;
        let div = document.createElement("div");
        div.className = "col-12 col-md-6 col-lg-2 full_card";
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
        // "<a href=product.html?" +
        // data[x]._id +
        // ">" +
        // "<img width= '200px' src='" +
        // data[x].imageUrl +
        // "'>" +
        // "<figcaption>" +
        // "<p>" +
        // data[x].name +
        // "</p>" +
        // "<p>" +
        // data[x].price /100 + "€" +
        // "</p>" +
        // "<p>Description : " +
        // data[x].description +
        // "</p>" +
        // "</figcaption>" +
        // "</a>";
        section.getElementsByClassName("content")[0].appendChild(div);
      }
      return section;
    })
    .then((section) => {
      main.appendChild(section);
    });
}
