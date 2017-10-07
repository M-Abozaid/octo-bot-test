var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Vertical = require('../models/vertical');
var Region = require('../models/region');

var verticalRouter = express.Router();
verticalRouter.use(bodyParser.json());

verticalRouter.route('/')
    .get(function (req, res, next) {
        console.log(req.query)
        Vertical.find(req.query)
            .populate('regionId')
            .exec(function (err, vertical) {
                if (err) return next(err);
                res.json(vertical);
            });
    })


    .post(function (req, res, next) {
        try {
            Region.find({ "regionName": req.body.regionName }).then(region => {
                console.log("region ",region)
                if (!region || region.length === 0) {
                    return res.end("region doesn't exist")
                }
    
                Vertical.create({ 
                    isActivated: req.body.isActivated, 
                    verticalName: req.body.verticalName,
                    regionId: region[0]._id 
                }).then( (vertical)=> {
                    
                    console.log('vertical created!');
    
                    var id = vertical._id;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
    
                    res.end('Added the vertical with id: ' + id);
                }).catch(err =>{
                    console.log('err ',err)
                    res.end('err ' + "error creating vertical " + err)
                });
    
            }).catch(err => {
    
                res.end('err ' + "region doesn't exist")
            })
        } catch (error) {
            console.log('err ',error)
        }



    })


module.exports = verticalRouter;