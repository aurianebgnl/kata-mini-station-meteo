const BTN_OK = document.querySelector("#btn-ok");
const CITY_OUTPUT = document.querySelector("#city");
const GPS_OUTPUT = document.querySelector("#gps");
const TEMP_OUTPUT = document.querySelector("#temperature");
const DETAILS_OUTPUT = document.querySelector("#details");

// fonction pour récupérer le nom de la ville à rechercher
function getCityName() {
    let input = document.querySelector("#city-input").value;
    
    return input
}

// Fonction pour afficher les données récupérées sur la page
function showOutput(name, latitude, longitude, temp) {
    CITY_OUTPUT.innerHTML = name
    GPS_OUTPUT.innerHTML = `Coordonées GPS : ${latitude}, ${longitude}`
    TEMP_OUTPUT.innerHTML = `${temp}°C`
    DETAILS_OUTPUT.innerHTML = "Température actuelle";

    return
}

// Fonction affichage résultat en cas d'erreur
function showOutputError(){
    CITY_OUTPUT.innerHTML = 'Ville non trouvée';
    GPS_OUTPUT.innerHTML = `_`
    TEMP_OUTPUT.innerHTML = `_`
    DETAILS_OUTPUT.innerHTML = "Vérifiez le nom de la ville";

    return
}

// Fonction pour récuperer les coordonnées GPS d'une ville sur l'API Open Street Map
async function fetchCoordinates(city) {
    try {
  
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();
      
      console.log(data);
      return data 
  
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées GPS :", error);
     
      }
  }

// Fonction pour récupérer la température à partir des coordonées d'une ville sur l'API Open Meteo
async function fetchWeather(cityLat, cityLon) {
    try {

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityLat}&longitude=${cityLon}&current=temperature_2m,precipitation,relative_humidity_2m`);
        const data = await response.json();
    
        console.log(data);
        return data;
    
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
       
        }
}

// Fonction pour lancer la recherche de la ville
BTN_OK.addEventListener("click", async () => {
    let cityInput = document.querySelector("#city-input").value;
    const city = await fetchCoordinates(cityInput);
    console.log(city);

    if (city.length === 0) {
        showOutputError()
        return
    }

    const cityName = city[0].name
    const cityLat = city[0].lat
    const cityLon = city[0].lon
    
    const temp = await fetchWeather(cityLat, cityLon)
    const cityTemp = temp.current.temperature_2m

    showOutput(cityName, cityLat, cityLon, cityTemp)

    });