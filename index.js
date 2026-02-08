import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app = express();
const port = 3000;


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

function formatPopulation(num) {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + " Billion";
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + " Million";
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + " Thousand";
    }
    return num;
}


app.get("/", (req, res) => {
    res.render("index.ejs", {
        country: null
    });
});


app.post("/search", async (req, res) => {
    const countryName = req.body.country;

    try {
        const response = await axios.get(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        const results = response.data;

        // try to find exact match
        const countryData =
            results.find(c =>
                c.name.common.toLowerCase() === countryName.toLowerCase()
            ) || results[0];   // fallback if exact match not found

        const capital = countryData.capital[0];
        const currencyCode = Object.keys(countryData.currencies)[0];
        const currencyResponse = await axios.get(
            `https://open.er-api.com/v6/latest/USD`
        );

        const rate = currencyResponse.data.rates[currencyCode];
        const formattedRate = rate.toFixed(2);



        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${WEATHER_API_KEY}`
        );

        const weatherData = weatherResponse.data;

        const newsResponse = await axios.get(
            `https://newsapi.org/v2/top-headlines`,
            {
                params: {
                    q: countryData.name.common,
                    apiKey: NEWS_API_KEY,
                    pageSize: 5
                }
            }
        );

        const articles = newsResponse.data.articles;


        res.render("index.ejs", {
            country: countryData,
            formattedPopulation: formatPopulation(countryData.population),
            weather: weatherData,
            exchangeRate: formattedRate,
            currencyCode: currencyCode,
            news: articles
        });


    } catch (error) {
        res.render("index.ejs", {
            country: null
        });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
