$("#submit").on("click", (event) => {
    event.preventDefault();
    $("#welcome-page").addClass("hide");
    $("#siteInformationArea").addClass("hide");
    $("#card").removeClass("hide");
    getLocation();
});

let restaurants = [];

// Google Map API
var map;
var directionsService;
var directionsRenderer;

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom: 8,
        center: {
            lat: -33.8688,
            lng: 151.2093,
        },
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    directionsRenderer.setMap(map);
}

// Add marker function
function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
    });

    if (props.content) {
        console.log(props.content, map);
        var infoWindow = new google.maps.InfoWindow({
            content: props.content,
        });

        marker.addListener("click", function () {
            infoWindow.open(map, marker);
        });
    }
}

// Rendering content
function getLocation() {
    const locationInput = $("#location").val();
    const locationURL =
        "https://developers.zomato.com/api/v2.1/locations?query=" +
        locationInput;
    $.ajax({
        url: locationURL,
        method: "GET",
        headers: { "user-key": "1a1c38e54e42f2ec4d53164ce7ba37ed" },
    }).then(function (response) {
        const entity_id = response.location_suggestions[0].entity_id;
        const entity_type = response.location_suggestions[0].entity_type;
        const lat = response.location_suggestions[0].latitude;
        const lng = response.location_suggestions[0].longitude;

        // Getting restaurants
        const cuisine = $("#cuisine").val();
        let searchURL;
        if (entity_type !== "subzone") {
            searchURL =
                "https://developers.zomato.com/api/v2.1/search?q=" +
                cuisine +
                "&lat=" +
                lat +
                "&lon=" +
                lng +
                "&radius=500&cuisines=" +
                cuisine +
                "&sort=real_distance&order=asc";
        } else {
            searchURL =
                "https://developers.zomato.com/api/v2.1/search?entity_id=" +
                entity_id +
                "&entity_type=" +
                entity_type +
                "&q=" +
                cuisine +
                "&radius=500&cuisines=" +
                cuisine +
                "&sort=real_distance&order=asc";
        }

        $.ajax({
            url: searchURL,
            method: "GET",
            headers: { "user-key": "1a1c38e54e42f2ec4d53164ce7ba37ed" },
        }).then(function (response) {
            let image;
            let title;
            let address;
            let lat;
            let lng;

            for (let i = 0; i < 3; i++) {
                image = response.restaurants[i].restaurant.featured_image;
                title = response.restaurants[i].restaurant.name;
                address = response.restaurants[i].restaurant.location.address;
                lat = parseFloat(
                    response.restaurants[i].restaurant.location.latitude
                );
                lng = parseFloat(
                    response.restaurants[i].restaurant.location.longitude
                );

                const wrapper = $("<div>").addClass("col s12 m4");
                const card = $("<div>").addClass("card");
                const cardImage = $("<div>").addClass("card-image");
                const cardContent = $("<div>").addClass(
                    "card-title center-align"
                );
                const cardAction = $("<div>").addClass(
                    "card-action center-align"
                );
                const cardLoationTitle = $("<div>").addClass(
                    "cardLoationTitleElement center-align"
                );

                if (image === "") {
                    cardImage.append(
                        $("<img>").attr(
                            "src",
                            "https://upload.wikimedia.org/wikipedia/en/6/64/Zomato_logo_%28white-on-red%29.png"
                        )
                    );
                } else {
                    cardImage.append($("<img>").attr("src", image));
                }

                cardLoationTitle.append(
                    $("<p>").text("Food Crawl Location: " + [i + 1])
                );
                cardContent.append($("<p>").text(title));
                cardAction.append($("<p>").text(address));
                card.append(
                    cardLoationTitle,
                    cardContent,
                    cardAction,
                    cardImage
                );
                wrapper.append(card);
                $("#search-results").append(wrapper);

                // Getting lat and lon for the rendered restaurants
                let restaurant = {
                    coords: { lat, lng },
                    content: title,
                };
                restaurants.push(restaurant);

                function calcRoute() {
                    var request;
                    if (restaurants.length === 1) {
                        addMarker(restaurants[0]);
                    } else if (restaurants.length === 2) {
                        request = {
                            origin: restaurants[0].coords,
                            destination: restaurants[1].coords,
                            travelMode: "WALKING",
                        };
                    } else {
                        request = {
                            origin: restaurants[0].coords,
                            destination: restaurants[1].coords,
                            waypoints: [
                                {
                                    location: restaurants[2].coords,
                                    stopover: true,
                                },
                            ],
                            optimizeWaypoints: true,
                            travelMode: "WALKING",
                        };
                    }
                    directionsService.route(request, function (result, status) {
                        console.log(result, status);
                        if (status == "OK") {
                            directionsRenderer.setDirections(result);
                        }
                    });
                }
                document.getElementById("renderButton").onclick = function () {
                    calcRoute();
                };
            }
        });
    });
}
