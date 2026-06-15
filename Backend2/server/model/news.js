import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
        default: null
    },

    source_id: {
        type: Number,
        required: true
    },

    category_id: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});

const News = mongoose.model(
    "News",
    newsSchema
);

export default News;