
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var publisherSchema = new Schema({
    publisherName: {
        type: String,


    },
    verticalId: {
        type: Schema.Types.ObjectId,
        ref: 'Vertical'
    },
    isActivated: {
        type: Boolean,

    },
    isLive: {
        type: Boolean,

    },
    caps_minutes: {
        type: Number
    },
    caps_hours: {
        type: Number
    },
    caps_day: {
        type: Number
    }
}, {
        timestamps: true
    });

var Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;