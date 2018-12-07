var express = require('express');
var router = express.Router();

router.get('/', heart);
router.get('/activate', activate);
router.get('/stop', stop);

var activation = false;

function heart(req, res, next) {
    if(activation){
        let min1 = 180;
        let min2 = 130;
        let max1 = 220;
        let max2 = 160;
        let rythm = 0;
        if(res.locals.sport) {
            rythm = Math.random() * (max1 - min1) + min1;
        }else{
            rythm = Math.random() * (max2 - min2) + min2;
        }
        res.json(rythm);
    }else{
        res.json({
            error: "Please activate the cardiac system"
        })
    }
}

function activate(req, res, next){
    if(activation){
        res.json({
            error: "Cardiac system already activated"
        })
    }else{
        activation = true;
        res.json({
            ok: "Cardiac system activated"
        });
    }
}

function stop(req, res, next){
    if(!activation){
        res.json({
            error: "Cardiac system not activated"
        })
    }else{
        activation = false;
        res.json({
            ok: "Cardiac system stopped"
        });
    }
}


module.exports = router;