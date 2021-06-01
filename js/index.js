 let categories = ['teddies']
 let main = document.getElementById('main')
 chiffrePanier() 
     for (let i = 0; i < categories.length; i++){
         
         fetch('http://localhost:3000/api/' + categories[i])
         .then(response => {
             return response.json()
          }).then(data => {
            let section = document.createElement("section")
            section.innerHTML =
                "<h2>" + categories[i] + "</h2>"
                + "<div class=content>"
                + "</div>"
             for(let x = 0; x < data.length; x++){
                 console.log(data[x].name)
                 let figure = document.createElement("figure")
                 figure.innerHTML =
                         '<a href=product.html?' + data[x]._id + ">"
                         + "<img width= '200px' src='" + data[x].imageUrl + "'>"
                         + "<figcaption>"
                         + "<p>" + data[x].name + "</p>"
                         + "<p>Prix : " + data[x].price + "</p>"
                         + "<p>Description : " + data[x].description + "</p>"
                         + "</figcaption>"
                         + "</a>"
                 section.getElementsByClassName('content')[0].appendChild(figure)
             }
             return section
         }).then( section => {
          main.appendChild(section)
          })
     }