var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request-promise')

var motionAi = express.Router();
motionAi.use(bodyParser.json());

motionAi.route('/send').post(function (req, res, next) {
    console.log('req.body ', req.body)
    request("https://api.motion.ai/messageBot?bot=85343&msg=" + req.body.text + "&session=1234&key=29579ad03188d2e44b817918420aa550").then(motionRes => {

        console.log(motionRes)
        res.json(motionRes)
    })
})

module.exports = motionAi