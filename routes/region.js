var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Region = require('../models/region');

var regionRouter = express.Router();
regionRouter.use(bodyParser.json());

regionRouter.route('/')
.get(function (req, res, next) {
     Region.find()
        .exec(function (err, regions) {
        if (err) return next(err);
        res.json(regions);
    });
})

.post(function (req, res, next) {
 
    Region.create(req.body, function (err, region) {
        if (err) return next(err);
        console.log('region created!');
        var id = region._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the region with id: ' + id);
    });
})

module.exports = regionRouter;