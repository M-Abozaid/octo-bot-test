
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var regionSchema = new Schema({
    regionName: {
        type: String,
        required: true,

    },
    isActivated: {
        type: Boolean,

    }
}, {
        timestamps: true
    });

var Region = mongoose.model('Region', regionSchema);

module.exports = Region;