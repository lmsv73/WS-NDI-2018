var express = require('express');
var router = express.Router();
var weather = require('../weatherapi.json');
var axios = require('axios');

router.get('/', meteo);
router.get('/:lat', meteo);
router.get('/:lat/:long', meteo);

function meteo(req, res, next){
    let coord = {
        lat: 0,
        long: 0
    };
    if(req.params.lat && req.params.long){
        coord.lat = req.params.lat;
        coord.long = req.params.long;
    }else{
        coord.lat = weather.defaultLat;
        coord.long = weather.defaultLong;
    }
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: coord.lat,
            lon: coord.long,
            appid: weather.appid
        }
    }).then((response) => {
        res.json({
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).send('Erreur lors de la récupération de la météo');
    })
}

module.exports = router;
