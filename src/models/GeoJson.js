const mongoose = require("mongoose");
/* This is our geoUserSchema which will convert our form data
 * into a geoJSON correct format that can then be inserted into
 * our database...
 */

let geoJsonSchema = mongoose.Schema({

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
        project_type: {type: String},
        description: {type: String},
        project_website: {type:String},
        img: {type: String},
        building: {type: String},
        room_number: {type: String},
        community_partners: {type: String},
        project_mission: {type: String},

        /*field where we can associate a geoJson with an owner*/
        owner: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: {
                type: String
            }
        },
        self: {
            _id: {
                type: String
            }
        }
    }
});

module.exports = mongoose.model("geoJson", geoJsonSchema);
