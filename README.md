# FoodieCrawl

An app to organize pubcrawls....but for food!

### User Story:

```
As A person who is hungry
I WANT to designate a cuisine and a starting location
SO THAT I can start tracking my "foodie crawl"
```

### Instructions:

1. A user can type in cuisine choice and Location where they want to start the Crawl
2. User is presented with three restaurant options within a certain radius of eachother
3. The user then clicks the 'Lets Crawl!' button below the map, and the three restaurants will be maked on the map, with directions linking them

### Demo:

![Foodie Crawl demo](./assets/foodieCrawl.gif)

#### Technical Details

APIs used in this app are: Zomato and Google Maps, whereas CSS is handled by the Materialize framework.

1. Users' input of Cuisine is taken and placed into the Zomato Search API directly
2. The input of location is a bit more complicated:
    1. First going through the Zomato Locations API, where it is parsed in.
    2. From the returning Locations object, we take the Latitude and Longitude coordinates of the suburb and its entity_id and entity_type accordingly.
    3. The Lat/Lon coordinates are then also parsed into the Zomato Search API, which is then called with the additional parameters of a maximum radius around the original coordinates and a limit of three results
3. The restaurants are then shown in the display containers, with an image, name and address
4. When the user clicks the "Let's Crawl!" button, the google Map API's take the address supplied in the Zomato Search objects, place markers at those coordinates and then generate directions between them.

#### Directions for future development:

1. Adding Social media elements
    1. Live feeds of people experiences
    2. Tags for the site etc
2. Addition of “https://www.smsbroadcast.com.au/developers” & “https://burstsms.com.au/” API’s to allow users to text each other plans for the ‘Crawl’
3. Look back at the Nutritionix API and use it to calculate how far you need to walk between restaurants based on calories
