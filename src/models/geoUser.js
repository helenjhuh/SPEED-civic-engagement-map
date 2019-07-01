const mongoose = require("mongoose");

/* This is our geoUserSchema which will convert our form data
 * into a geoJSON correct format that can then be inserted into
 * our database...
 */

let geoUserSchema = new mongoose.Schema({

    type: {
        type: String
    },
    geometry: {
        type: {
            type:String,
        },
        coordinates: {
            type: [Number],
            index: '2d'
        },
    },
    properties:
    {
        title: {type: String},
        description: {type: String},
        contact: {type: String},
        contact_email: {type: String},
        community_partners: {type: String}
    }
});

/* Export geoUser to represent our user as a geoJSON object */
module.exports = new mongoose.model("geoUser", geoUserSchema);

