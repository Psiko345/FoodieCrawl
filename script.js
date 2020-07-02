$("#submit").on("click", (event) => {
    event.preventDefault();
    $("#welcome-page").addClass("hide");
    $("#card").removeClass("hide");
    getLocation();
});

var map;
let restaurants = [];

// Initialize and add the map
function initMap() {
    // Map options
    var options = {
        zoom: 4,
        center: {
            lat: -33.8688,
            lng: 151.2093,
        },
    };
    // New map
    this.map = new google.maps.Map(document.getElementById("map"), options);
    console.log("map", this.map);
}

// Add marker function
function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
    });
    console.log("add marker");
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
        console.log(entity_id, entity_type);
        console.log(lat, lng);

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
            let website;
            let lat;
            let lng;

            for (let i = 0; i < 3; i++) {
                image = response.restaurants[i].restaurant.featured_image;
                title = response.restaurants[i].restaurant.name;
                address = response.restaurants[i].restaurant.location.address;
                website = response.restaurants[i].restaurant.url;
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

                console.log(image, title, address, website);

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

                cardContent.append($("<span>").text(title));

                cardAction
                    .append($("<p>").text(address))
                    .append($("<a>").attr("href", website).text("Let's Crawl"));

                card.append(cardImage, cardContent, cardAction);
                wrapper.append(card);
                $("#search-results").append(wrapper);

                // Getting lat and lon for the rendered restaurants
                let restaurant = {
                    coords: { lat, lng },
                    content: title,
                };
                restaurants.push(restaurant);
                console.log(restaurants);

                for (let j = 0; j < restaurants.length; j++) {
                    addMarker(restaurants[j]);
                }
            }
        });
    });
}
