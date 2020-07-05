# FoodieCrawl

An app to organize pubcrawls....but for food!

// Screen cap / gif of how the website works
<img src="./assets/foodieCrawl.gif">

// Directions of how to use in text, to supplement gif

1. User input's their cuisine choice and Location where they want to start the Crawl
2. User is presented with three restaurant options within a certain radius of eachother
3. The user then clicks the 'Lets Crawl!' button below the map, and the three restaurants will be maked on the map, with directions linking them

// Basic technical layout, how it works, what API's we're using, Materialize instead of bootstrap

1. API's used are: Zomato, Google Maps & Google Directions, with CSS handled by the Materialize framework
2. User input of Cuisine is taken and placed into the Zomato Search API directly
3. The input of location is a bit more complicated. First going through the Zomato Locations API, where it is parsed in.
   3a. From the returning Locations object, we take the Latitude and Longitude coordinates of the suburb
4. The Lat/Lon coordinates are then also parsed into the Zomato Search API, which is then called with the additional parameters of a maximum radius around the original coordinates and a limit of three results
5. The restaurants are then shown in the display containers, with an image, name and address
6. When the user clicks the "Let's Crawl!" button, the google Directions and Map API's take the coordinates supplied in the Zomato Search objects, place markers at those coordinates and then generate directions between them.

// Directions for future development: SMS to your friends, social media (insta,twitter, live-feed etc.), calorie counting vs burning....etc

1. Social Media linking
2. SMS capabilites between users
3. Calorie counting/burning

//
