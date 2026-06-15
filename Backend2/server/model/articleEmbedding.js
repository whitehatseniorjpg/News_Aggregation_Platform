import mongoose from "mongoose";

const articleEmbeddingSchema =
new mongoose.Schema({

    article_id: Number,

    title: String,

    embedding: [Number]

});

const ArticleEmbedding =
mongoose.model(
    "ArticleEmbedding",
    articleEmbeddingSchema
);

export default ArticleEmbedding;