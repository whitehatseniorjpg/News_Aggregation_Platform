import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({

id: {
    type: Number,
    unique: true
},
    name: String,

    url: String,

    type: String

});

const Source =
mongoose.model(
    "Source",
    sourceSchema
);

export default Source;