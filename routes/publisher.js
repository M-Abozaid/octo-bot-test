var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Publisher = require('../models/publisher');

var publisherRouter = express.Router();
publisherRouter.use(bodyParser.json());

publisherRouter.route('/')
.get(function (req, res, next) {
     Publisher.find(req.body)
        .populate('verticalId')
        .exec(function (err, publisher) {
        if (err) return next(err);
        res.json(publisher);
    });
})

.post(function (req, res, next) {
 
    Publisher.create(req.body, function (err, publisher) {
        if (err) return next(err);
        console.log('publisher created!');
        var id = publisher._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the publisher with id: ' + id);
    });
})


module.exports = publisherRouter;