//Chiffre panier
function chiffrePanier () {
    let cartLocalStorage = JSON.parse(localStorage.getItem("produit"));
    if (cartLocalStorage === null) {
        document.querySelector('.numero_panier').innerText = 0
      } else {
        let numeroCart = cartLocalStorage.length
        document.querySelector('.numero_panier').innerText = numeroCart
        console.log(numeroCart)
      }
}