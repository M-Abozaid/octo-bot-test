var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Publisher = require('../models/publisher');
var Vertical = require('../models/vertical');
var publisherRouter = express.Router();
publisherRouter.use(bodyParser.json());

publisherRouter.route('/')
    .get(function (req, res, next) {
        Publisher.find()
            .populate('verticalId')
            .exec(function (err, publisher) {
                if (err) return next(err);
                res.json(publisher);
            });
    })

    .post(function (req, res, next) {
        Vertical.find({ "verticalName": req.body.verticalName }).then(vertical => {
            console.log("vertical ", vertical)
            if (!vertical || vertical.length === 0) {
                return res.end("vertical doesn't exist")
            }

            Publisher.create({
                publisherName: req.body.publisherName,
                verticalId: vertical._id,
                isActivated: true
            }, function (err, publisher) {
                if (err) return next(err);
                console.log('publisher created!');
                var id = publisher._id;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.end('Added the publisher with id: ' + id);
            });
        });
    })


module.exports = publisherRouter;