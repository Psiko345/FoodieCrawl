window.onload = function () {
  getNutrition();
  getZomato();
};

// Zomato
function getZomato() {
  // Sydney id: 260
  // "https://developers.zomato.com/api/v2.1/locations?query=sydney" -- location api - to get lat, lon
  // "https://developers.zomato.com/api/v2.1/search?entity_id=260&entity_type=city&count=3&lat=-33.865&lon=151.2094&radius=500&cuisines=Thai&sort=real_distance&order=desc"
  // -- search api - gets everything, inputs are: entity id, entity_type, count, lat, lon, radius, cuisines, sort:real_distance, order:desc
  const zomatoQueryURL =
    "https://developers.zomato.com/api/v2.1/cuisines?city_id=260";

  $.ajax({
    url: zomatoQueryURL,
    method: "GET",
    headers: { "user-key": "1a1c38e54e42f2ec4d53164ce7ba37ed" },
  }).then(function (response) {
    console.log(response);
  });
}

// Nutritionix
function getNutrition() {
  const nutritionixURL =
    "https://nutritionix-api.p.rapidapi.com/v1_1/search/mcdonalds?fields=nf_calories%252Cnf_total_fat";

  $.ajax({
    url: nutritionixURL,
    method: "GET",
    headers: {
      "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
      "x-rapidapi-key": "1a2458beb0mshc0c5065ac438661p1dc054jsnb4bee91478de",
    },
  }).then(function (response) {
    console.log(response);
  });
}

function handleCuisineSearch() {
  //$("#cuisine").
}
