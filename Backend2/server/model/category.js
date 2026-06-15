import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

id: {
    type: Number,
    unique: true
},
    category: String

});

const Category =
mongoose.model(
    "Category",
    categorySchema
);

export default Category;