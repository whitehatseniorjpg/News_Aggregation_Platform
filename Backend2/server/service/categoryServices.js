import Category from "../model/category.js";

export const saveCategory = async (data) => {

    let response = {};

    try {

        const maxCategory =
            await Category.findOne()
                .sort({ id: -1 });

        data.id =
            maxCategory
            ? maxCategory.id + 1
            : 1;

        await Category.create(data);

        response = {
            code: 200,
            message: "Category Saved Successfully"
        };

    } catch(error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};

export const getCategories = async () => {

    let response = {};

    try {

        const categories =
            await Category.find()
                .sort({ id: 1 });

        response = {
            code: 200,
            categories: categories
        };

    } catch(error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};