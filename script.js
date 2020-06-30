$("#submit").on("click", (event) => {
    event.preventDefault();
    $("#welcome-page").addClass("hide");
    $("#card").removeClass("hide");
    getLocation();
});

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
        console.log(response);
        const entity_id = response.location_suggestions[0].entity_id;
        const entity_type = response.location_suggestions[0].entity_type;
        const lat = response.location_suggestions[0].entity_type;
        const lon = response.location_suggestions[0].entity_type;
        console.log(entity_id, entity_type);
        const cuisine = $("#cuisine").val();

        // get restaurants
        const searchURL =
            "https://developers.zomato.com/api/v2.1/search?entity_id=" +
            entity_id +
            "&entity_type=" +
            entity_type +
            "&q=" +
            cuisine +
            "&sort=real_distance&order=desc";
        $.ajax({
            url: searchURL,
            method: "GET",
            headers: { "user-key": "1a1c38e54e42f2ec4d53164ce7ba37ed" },
        }).then(function (response) {
            console.log(response);
            let image;
            let title;
            let address;
            let website;

            for (let i = 0; i < 3; i++) {
                image = response.restaurants[i].restaurant.featured_image;
                title = response.restaurants[i].restaurant.name;
                address = response.restaurants[i].restaurant.location.address;
                website = response.restaurants[i].restaurant.url;

                const wrapper = $("<div>").addClass("col s12 m4");
                const card = $("<div>").addClass("card");
                const cardImage = $("<div>").addClass("card-image");
                const cardContent = $("<div>").addClass("card-title");
                const cardAction = $("<div>").addClass("card-action");

                console.log(image, title, address, website);

                cardImage
                    .append($("<img>").attr("src", image))
                    .append($("<span>").addClass("card-title").text(title));

                cardContent.append($("<p>").text(address));

                cardAction.append(
                    $("<a>").attr("href", website).text("Let's Crawl")
                );

                card.append(cardImage, cardContent, cardAction);
                wrapper.append(card);
                $("#search-results").append(wrapper);
            }
        });
    });
}
