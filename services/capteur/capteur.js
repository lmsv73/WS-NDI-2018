var MongoClient = require('mongodb').MongoClient;
var data = require('./data.json');

module.exports = class Capteur{

    constructor(url){
        this.iTemp = 0;
        this.iWind = 0;
        this.iPressure = 0;
        this.iHumidity = 0;
        this.iLuminosity = 0;
        MongoClient.connect(url, function(err, client){
            let db = client.db('night_2018');
            db.collection('temp').findOne().then((res) => {
                if(res === null){
                    db.createCollection('temp');
                }
            });
            db.collection('wind').findOne().then((res) => {
                if(res === null){
                    db.createCollection('wind');
                }
            });
            db.collection('pressure').findOne().then((res) => {
                if(res === null){
                    db.createCollection('pressure');
                }
            });
            db.collection('humidity').findOne().then((res) => {
                if(res === null){
                    db.createCollection('humidity');
                }
            });
            db.collection('luminosity').findOne().then((res) => {
                if(res === null){
                    db.createCollection('luminosity');
                }
            });
            client.close();
        })
        this.calcAltitude = function(pression/* en hpascal*/,temperature /* en kelvin */){
          let p=1013;
          let g=9.81; /*constante de gravitation*/
          let cp=1006; /*capcites calorifique de l'air*/
          let z=-Math.log(pression/p)*cp*temperature*2/7/g;
          return((z).toFixed(1))
        }
        this.updateCapteurs = () => {
            let newTemp = {
                date: Date.now(),
                temp: data.temp[this.iTemp]
            }
            let newWind = {
                date: Date.now(),
                wind: data.wind[this.iWind]
            }
            let newPressure = {
                date: Date.now(),
                pressure: data.pressure[this.iPressure]
            }
            let newHumidity = {
                date: Date.now(),
                humidity: data.humidity[this.iHumidity]
            }
            let newLuminosty = {
                date: Date.now(),
                luminosity: data.luminosity[this.iLuminosity]
            }
            let newAltitude = {
                date: Date.now(),
                altitude: this.calcAltitude(newPressure.pressure, newTemp.temp)
            }
            if(this.iTemp === data.temp.length-1){
                this.iTemp = 0;
            }else{
                this.iTemp++;
            }
            if(this.iWind === data.wind.length-1){
                this.iWind = 0;
            }else{
                this.iWind++;
            }
            if(this.iPressure === data.pressure.length-1){
                this.iPressure = 0;
            }else{
                this.iPressure++;
            }
            if(this.iHumidity === data.humidity.length-1){
                this.iHumidity = 0;
            }else{
                this.iHumidity++;
            }
            if(this.iLuminosity === data.luminosity.length-1){
                this.iLuminosity = 0;
            }else{
                this.iLuminosity++;
            }
            MongoClient.connect(url, function(err, client){
                let db = client.db('night_2018');
                db.collection('temp').insertOne(newTemp).then(() => {
                    db.collection('wind').insertOne(newWind).then(() => {
                        db.collection('pressure').insertOne(newPressure).then(() => {
                            db.collection('humidity').insertOne(newHumidity).then(() => {
                                db.collection('luminosity').insertOne(newLuminosty).then(() => {
                                    db.collection('altitude').insertOne(newAltitude).then(() => {
                                        client.close();
                                    })
                                })
                            })
                        })
                    })
                })

            })
        }
        setInterval(this.updateCapteurs, 30000);
    }
}