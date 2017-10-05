var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var vertical = require('../models/vertical');
var Region = require('../models/region');

var verticalRouter = express.Router();
verticalRouter.use(bodyParser.json());

verticalRouter.route('/')
    .get(function (req, res, next) {
        console.log(req.query)
        vertical.find(req.query)
            .populate('regionId')
            .exec(function (err, vertical) {
                if (err) return next(err);
                res.json(vertical);
            });
    })


    .post(function (req, res, next) {

        Region.find({ "regionName": req.body.regionName }).then(region => {
            console.log(region)
            if (!region || region.length === 0) {
                return res.end("region doesn't exist")
            }

            vertical.create({ 
                isActivated: req.body.isActivated, 
                verticalName: req.body.verticalName,
                regionId: region._id 
            }).then( (err, vertical)=> {
                if (err) return next(err);
                console.log('vertical created!');

                var id = vertical._id;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.end('Added the vertical with id: ' + id);
            });

        }).catch(err => {

            res.end('err ' + "region doesn't exist")
        })


    })


module.exports = verticalRouter;