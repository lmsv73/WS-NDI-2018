var express = require('express');
var router = express.Router();

router.get('/', heart);

function heart(req, res, next) {
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
}

module.exports = router;