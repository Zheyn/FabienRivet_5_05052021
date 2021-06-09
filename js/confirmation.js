// Récupération des données "confirmation" du local storage
let confirmation = JSON.parse(localStorage.getItem('confirmation'))
console.log(confirmation);

// Intégration du numéro de commande dans le code HTML
let confirmationIdHtml = document.querySelector('.confirmation_id')
let confirmationId = confirmation.orderId
confirmationIdHtml.innerHTML = `Votre commande N°<span class="confirmation_id-italic">${confirmationId}</span> est validée.`;

//Supression de la clée "confirmation" dans le local storage
let btnConfirmation = document.querySelector('.btn_confirmation')
btnConfirmation.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem('confirmation');
    document.location.href = "index.html";
})
