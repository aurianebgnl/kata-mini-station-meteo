// A toi de jouer pour cette partie :-) Happy coding !

const BTN_OK = document.querySelector("#btn-ok");
const CITY_OUTPUT = document.querySelector("#city");
const GPS_OUTPUT = document.querySelector("#gps");
const TEMP_OUTPUT = document.querySelector("#temperature");
const DETAILS_OUTPUT = document.querySelector("#details");


// Fonction pour récuperer les coordonnées GPS d'une ville sur l'API Open Street Map
async function fetchCityGPS(city) {
  try {

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
    const data = await response.json();

    console.log(data);
    return data;

  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées GPS :", error);
   
    }
}

// Fonction pour lancer la recherche de la ville
BTN_OK.addEventListener("click", async () => {
    let cityInput = document.querySelector("#city-input").value;
    const city = await fetchCityGPS(cityInput);
    const cityName = city[0].name
    const cityLat = city[0].lat
    const cityLon = city[0].lon

    console.log(city);

    // Afficher les coordonnées GPS dans la console
    console.log("Latitude :", city[0].lat);
    console.log("Longitude :", city[0].lon);

    showOutput(cityName, cityLat, cityLon)
    });

// fonction pour récupérer le nom de la ville à rechercher
function getCityName() {
    let input = document.querySelector("#city-input").value;
    
    return input
}

// Fonction pour afficher les données récupérées sur la page
function showOutput(name, latitude, longitude) {
    CITY_OUTPUT.innerHTML = name
    GPS_OUTPUT.innerHTML = `Coordonées GPS : ${latitude}, ${longitude}`

    return

}