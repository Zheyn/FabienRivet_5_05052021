// Récupération de l'id dans l'url
/*search	La partie de l'URL qui suit le symbole « ? », avec ce symbole inclus*/
const urlid = window.location.search;
console.log(urlid)

// Suppression du "?" avec la méthode slice
const id = urlid.slice(1);
console.log(id)

let card = document.querySelector('img')
let name1 = document.querySelector('.name1')
let description = document.querySelector('.description')
let price = document.querySelector('.price')
let color = document.querySelector('.colors')
let cardbody = document.querySelector('.card-body')

fetch(`http://localhost:3000/api/teddies/${id}`)

.then(response => {
    return response.json()
}).then(data => {
    console.log(data);
    card.src = data.imageUrl;
    name1.innerText = data.name
    description.innerText = data.description
    price.innerText = data.price /100 + "€"

    let colors = data.colors
    for (let i = 0; i < colors.length; i++) {
        console.log(colors[i])
    let btn = document.createElement('button')
        btn.setAttribute("class", "btn btn-primary")
        btn.setAttribute("value", `${colors[i]}`)
        btn.innerHTML = colors[i]
        cardbody.appendChild(btn)
        console.log(btn)
        const btnValue = btn.value
        btn.onclick = (val =>{
        localStorage.setItem("color", `${btnValue}`)
    })
    console.log(btnValue)
    }
})

//localStorage.setItem("nom", "Zheyn")
//localStorage.getItem("nom", "Zheyn")