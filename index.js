//RESUELVE TUS EJERCICIOS AQUI
//Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.

const { use } = require("react");

/*1.- Declara una funcion getAllBreeds que devuelva un array de strings 
con todas las razas de perro.*/
/*function getAllBreeds() {
    return fetch("https://dog.ceo/api/breeds/list/all")// llamada a la API
        .then((res) => res.json()) // Convertir a objeto la respuesta
        .then(data => Object.keys(data.message));//devuelve las claves (keys / propiedades) de un objeto en forma de array.
}

getAllBreeds().then((data) => console.log("Ejer 1:\n" + data));*/

/*2.- Declara una función getRandomDog que obtenga una imagen
random de una raza. */
/*function getRandomDog() {
    return fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .then(data => data.message);
}
getRandomDog().then((data) => console.log("Ejer 2:\n" + data));*/

/*3.- Declara una función getAllImagesByBreed que obtenga todas las 
imágenes de la raza komondor. */
/*function getAllImagesByBreed() {
    return fetch("https://dog.ceo/api/breed/komondor/images")
        .then((res) => res.json())
        .then(data => data.message);
}

getAllImagesByBreed().then((data) => console.log("Ejer 3:\n", data));*/

/*4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada 
por el argumento */
/*function getAllImagesByBreed2(breed) {
    return fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then((res) => res.json())
        .then(data => data.message);
}
getAllImagesByBreed2("bulldog").then((data) => console.log("Ejer 4:\n", data));*/

//GitHub API (I)
/*5.- Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github 
a partir de su nombre de usuario. (https://api.github.com/users/{username}).*/
function getGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
}

getGitHubUserProfile("MarioMS2000").then((data) => console.log("Ejer 5:\n", data));

/*6.- Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un 
usuario (username), retorne {img, name} y pinte la foto y el nombre en el DOM. */
function printGithubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then(data => {
            const user = {
                img: data.avatar_url,
                name: data.name
            };

            document.getElementById("contain-user").innerHTML += `
                <h2>${user.name}</h2>
                <img src="${user.img}" alt="${user.name}" width="150">
            `;

            return user;
        });
}

printGithubUserProfile("asolermaria").then((data) => console.log("Ejer 6:\n", data));

/*7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para 
obtener información de ese usuario y devuelva un string que represente una tarjeta HTML como en el 
ejemplo, la estructura debe ser exactamente la misma:

<section>
    <img src="url de imagen" alt="imagen de usuario">
    <h1>Nombre de usuario</h1>
    <p>Public repos: (número de repos)</p>
</section> */

function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then(data => {

            const card = `
                <section>
                    <img src="${data.avatar_url}" alt="${data.name}">
                    <h1>${data.name}</h1>
                    <p>Public repos: ${data.public_repos}</p>
                </section>
            `;

            document.getElementById("contain-userCompleto").innerHTML += card;

            return card;

        });
}

/* 8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar. El usuario escribirá en el 
input el nombre de usuario de GitHub que quiera buscar. Después llamaremos a la función 
getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.(Esto no se testea). */
const datosInput = document.getElementById("buscar").addEventListener("click", () => {
    const nombreUsuario = document.getElementById("name").value;

    getAndPrintGitHubUserProfile(nombreUsuario);
});

function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())

    //No pinta nada porque el ejercicio no lo pide, pero si quisieramos pintar haríamos como el de arriba
}

//GitHub API (II)- Promesas
/*9.- Dada una lista de usuarios de github guardada en una array,crea una funcion 
fetchGithubUsers(userNames) que utilice 'https://api.github.com/users/${name}' para obtener el nombre 
de cada usuario.
Objetivo: Usar Promise.all()
Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
Pregunta. ¿cuántas promesas tendremos?
Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

Pasos:*/
//Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
    /*function fetchGithubUsers(userNames) {
        const usersArray = userNames.map((login) => {
            return fetch(`https://api.github.com/users/${login}`)
                .then((res) => res.json())
        });
    }*/
//Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
    /*return Promise.all(promesas) */

//Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de 
//cada usuario. Consigue que se imprima por consola el nombre de cada usuario.
    /*.then((userArray) => {
            userArray.forEach((user) => {
                console.log(user.repos_url);
                console.log(user.login);
            });
            return userArray;
        });*/

function fetchGithubUsers(userNames) {
    //Crear array de promesas
    //recorre el array y transforma cada elemento.
    const promesas = userNames.map((login) => {
        return fetch(`https://api.github.com/users/${login}`)//Fetch por cada usuario
            .then((res) => res.json())//Convertir respuesta a JSON
    });
    //esto devuelve un array de usuarios
    return Promise.all(promesas)
        //Cuando todas las promesas terminan
        .then((userArray) => {
            //Recorremos el array y pintamos por consola los dos console.log de cada usuario
            userArray.forEach((user) => {
                console.log(user.repos_url);
                console.log(user.login);
            });
            //Devolver los usuarios
            return userArray;
        });
}

fetchGithubUsers(["octocat","torvalds","gaearon"]).then((data) => console.log("Usuarios: ", data))