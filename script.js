// Fetch data from NASA API and update asteroid details
let current_date = new  Date();
current_date.getDate()+1;
var dateString = current_date.toISOString().slice(0,10);
async function fetchAsteroidData() {
  const setDate = document.querySelector("#date");
  setDate.innerHTML = dateString;
  try {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateString}&end_date=${dateString}&api_key=n4cxFgzhVOZEP8t7H43eNyyY5dCstQzLkq6sfKJ4`
    );
    // console.log(await response.json());
    const data = await response.json();
    console.log(data);
    updateAsteroidDetails(data);
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
  }
}

const detailsContainer = document.querySelector(".details");

// Update asteroid details
function updateAsteroidDetails(data) {
  let arr = Array();
  for (let i = 0; i < data.near_earth_objects[dateString].length; i++) {
    detailsContainer.innerHTML += `
  <div class= "astro">
  <h3>[${i + 1}] Name: ${data.near_earth_objects[dateString][i].name} | ID: ${
      data.near_earth_objects[dateString][i].id
    }</h3>
    <p><b>Estimated Diameter:</b> <span>${data.near_earth_objects[dateString][
      i
    ]["estimated_diameter"]["meters"]["estimated_diameter_max"].toFixed(
      3
    )} meters</span></p>
    <p><b>Orbiting Body:</b> <span>${
      data.near_earth_objects[dateString][i]["close_approach_data"][0][
        "orbiting_body"
      ]
    }</span></p>
    <p><b>Missing distance from ${
      data.near_earth_objects[dateString][i]["close_approach_data"][0][
        "orbiting_body"
      ]
    }:</b> <span>${Math.round(
      data.near_earth_objects[dateString][i]["close_approach_data"][0][
        "miss_distance"
      ]["kilometers"]
    )} kilometers</span></p>
    <p><b>Velocity:</b> <span>${Math.round(
      data.near_earth_objects[dateString][i]["close_approach_data"][0][
        "relative_velocity"
      ]["kilometers_per_hour"]
    )} km/h</span></p>
    
    <p><b>Closest Approach on:</b> <span>${
      data.near_earth_objects[dateString][i]["close_approach_data"][0][
        "close_approach_date_full"
      ]
    }</span></p>
  </div>`;
  arr.push(Math.round(data.near_earth_objects[dateString][i]["close_approach_data"][0]["miss_distance"]["kilometers"]));
  }
  const min = Math.min(...arr);
  document.querySelector("#closest").innerText = `${min}`;
}

// Initial setup
function init() {
  var audio = document.querySelector(".startAudio");
  audio.onloadedmetadata = function() {
    audio.play();
    audio.loop = true;
  };
  fetchAsteroidData(); // Fetch initial data
  setInterval(fetchAsteroidData, 60000); // Fetch data every minute
  setInterval(animateAsteroid, 1000); // Update animation every second
}

init(); // Initialize the application
