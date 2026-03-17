// Programación asíncrona
// fetch(), then() devuelven promesas

// fetch("https://rickandmortyapi.com/api/character/3") // llamada a la API
//   .then((res) => res.json()) // Convertir a objeto la respuesta
//   .then((data) => console.log(data)); // Utilizar el objeto respuesta




document.getElementById("descarga1").addEventListener("click", () => {

    fetch("https://rickandmortyapi.com/api/character/2")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("resultados").innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <p>${data.name} Especie:${data.species}</p>
        `
        });
});

// Llamada a la API, generar un section + article + renderizar datos en el DOM y devolver un string con el resultado del section

function getAndRenderProducts() {
    const url = "https://fakestoreapi.com/products?limit=10";
    return fetch(url)
        .then((response) => response.json()) // Convertir a objeto
        .then((data) => {
            console.log(data);
            let container = "<section>";

            data.forEach((product) => {
                container += `<article>
                          <img src="${product.image}" alt="${product.title}">
                          <h1>${product.title}</h1>
                          <p>${product.description}</p>
                      </article>`;
            });


            container += "</section>";

            //document.body.innerHTML += container;
            return container;
        })
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}

// Llamada a una función ASINCRONA
//console.log(getAndRenderProducts()); 
getAndRenderProducts().then((data) => console.log(data));


function getAndRenderProducts2() {
    const url = "https://fakestoreapi.com/products?limit=3";
    fetch(url)
        .then((response) => response.json()) // Convertir a objeto
        .then((data) => {
            let list = "<ul>";
            data.forEach((product) => {
                list += `<li>${product.title} -- ${product.price}€</li>`;
            });
            list += "</ul>";

            document.getElementById("resultados").innerHTML = list;
        })
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}


document.getElementById("descarga2").addEventListener("click", () => {
    // Llamada a la función
    getAndRenderProducts2();
});


//  La función retorna la promesa resultante de llamar a fetch() y controla en la llamada a la función la renderización del objeto

function getProducts(number) {
    const url = `https://fakestoreapi.com/products?limit=${number}`;
    return fetch(url)
        .then((response) => response.json()) // Convertir a objeto
        .then(data => {
            // sacar titulo de cada producto
            return data.map(producto => producto.title)
        })
        .catch((error) => {
            console.error("Error fetching data from fakestoreapi:", error);
        });
}

// Llamada a la función. Devuelve una promesa con los datos de la llamada a la API
//   getProducts(3).then((data) => console.log(data));
console.log(getProducts(3));