import mongoose from "mongoose";

const readingActivitySchema =
new mongoose.Schema({

    user_email: {
        type: String
    },

    article_id: {
        type: Number
    },

    article_title: {
        type: String
    },

    viewed_at: {
        type: Date,
        default: Date.now
    }

});

const ReadingActivity =
mongoose.model(
    "ReadingActivity",
    readingActivitySchema
);

export default ReadingActivity;