let axios = require("axios");
let Spotify = require('node-spotify-api');
let dotenv = require("dotenv").config();
let keys = require("./key.js");
let spoofy = new Spotify(keys.spotify)


let command = process.argv[2]
let argue = process.argv;
let cutOut = argue.splice(3)


switch(command){
    case "movie":
    movieTitle = cutOut.join("+");
    let queryUrl = "http://www.omdbapi.com/?t=" + movieTitle+ "&apikey=trilogy"
    axios.get(queryUrl).then(function (response){
        title = response.data.Title;
        year = response.data.Year;
        director = response.data.Director;
        plot = response.data.Plot;

        console.log(" ");
            console.log(title);
            console.log(year);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(`Directed by ${director}`);
            console.log(response.data.Actors);
            console.log(plot);

            console.log("\nRatings ");

        for(let i = 0; i<response.data.Ratings.length -1; i++){
            ratings = response.data.Ratings[i];
            console.log(`${ratings.Source} : ${ratings.Value}`);
    
        }
        
       
       
    })
    break;



    case "music":
    songTitle = cutOut.join("+");
    spoofy.request("https://api.spotify.com/v1/search?q="+songTitle+"&type=track&limit=5").then(function(response){
        for(let i = 0; i < 5; i++){
            let artist = response.tracks.items[i].album.artists[0].name;
            let title = response.tracks.items[i].name;
            console.log(" ");

            console.log(JSON.stringify(title,null,3));
            console.log(JSON.stringify(artist,null,3));
            console.log(response.tracks.items[i].album.name);
            console.log(response.tracks.items[i].preview_url);
    
        }
        


    }).catch(function(err){
        console.log(err);
    })
    break;


    case "band":
    artist = cutOut.join("+");

    let qUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(qUrl).then(function (response){
        for(let i = 0; i < 5; i++ ){
            let time = response.data[i].datetime.slice(0,10)
            let year = time.slice(0,4);
            let month = time.slice(5,7);
            let day = time.slice(8,12);
            console.log(" ");
            console.log(response.data[i].venue.name,null,2);
            console.log(response.data[i].venue.country,null,2);
            console.log(response.data[i].venue.region,null,2);
            console.log(response.data[i].venue.city,null,2);
            console.log(`${month}/${day}/${year}`);
            // response = JSON.stringify(response.data, null, 3);
            // console.log(response);
        }
    })
    break;


    default:
    console.log("wrong command \nuse movie, music, or band");
}
