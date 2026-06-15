import Source from "../model/source.js";

export const saveSource = async (data) => {

    let response = {};

    try {

        const maxSource =
            await Source.findOne()
                .sort({ id: -1 });

        data.id =
            maxSource
            ? maxSource.id + 1
            : 1;

        await Source.create(data);

        response = {
            code: 200,
            message: "Source Saved Successfully"
        };

    } catch(error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};

export const getSources = async () => {

    let response = {};

    try {

        const sources =
            await Source.find()
                .sort({ id: 1 });

        response = {
            code: 200,
            sources: sources
        };

    } catch(error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
