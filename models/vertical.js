
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var verticalSchema = new Schema({
    verticalName: {
        type: String,


    },
    regionId: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    },
    isActivated: {
        type: Boolean,

    }
}, {
        timestamps: true
    });

var Vertical = mongoose.model('Vertical', verticalSchema);

module.exports = Vertical;