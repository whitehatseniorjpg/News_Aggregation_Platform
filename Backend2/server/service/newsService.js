import News from "../model/news.js";
import axios from "axios";
import ReadingActivity from "../model/readingActivity.js";
import ArticleEmbedding from "../model/articleEmbedding.js";
import Source from "../model/source.js";

import {getEmbedding} from "../utils/embedding.js";

export const saveArticle = async (data, token) => {

    let response = {};

    try {
       const maxNews =
    await News.findOne({
        id: { $exists: true }
    }).sort({ id: -1 });

data.id =
    maxNews && maxNews.id
        ? maxNews.id + 1
        : 1;
        await News.create(data);
        response = {
            code: 200,
            message: "Article Saved Successfully"
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};

export const getArticles = async (page, limit) => {

    let response = {};

    try {

        const skip = (page - 1) * limit;

        const news = await News.find()
            .skip(skip)
            .limit(limit);

        const totalrecords =
            await News.countDocuments();

        response = {
            code: 200,
            news: news,
            totalpages:
                Math.ceil(
                    totalrecords / limit
                )
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};

export const getArticle = async (id) => {

    let response = {};

    try {

        const news =
    await News.findOne({
        id: parseInt(id)
    });

        response = {
            code: 200,
            news: news
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const search = async (keyword) => {

    let response = {};

    try {

        const news =
            await News.find({
                title: {
                    $regex: keyword,
                    $options: "i"
                }
            });

        response = {
            code: 200,
            news: news
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const deleteArticle = async (id) => {

    let response = {};

    try {

       await News.findOneAndDelete({
    id: parseInt(id)
});

        response = {
            code: 200,
            message: "Article Deleted Successfully"
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;

};
export const updateArticle = async (id, data) => {

    let response = {};

    try {

       await News.findOneAndUpdate(
    {
        id: parseInt(id)
    },
    data
);

        response = {
            code: 200,
            message: "Article Updated Successfully"
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const fetchAndSaveNews = async () => {

    let response = {};

    try {

        const categories = [
            "sports",
            "technology",
            "business",
            "health",
            "science",
            "entertainment",
            "general"
        ];

        const maxNews =
            await News.findOne({
                id: { $exists: true }
            }).sort({ id: -1 });

        let nextId =
            maxNews && maxNews.id
                ? maxNews.id + 1
                : 1;

        const newsToInsert = [];

        for(let i = 0; i < categories.length; i++) {

            const category = categories[i];

            const url =
                `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

            const apiResponse =
                await axios.get(url);

            const articles =
                apiResponse.data.articles;

            for(const article of articles) {

                if(
                    !article.title ||
                    !article.description ||
                    !article.content
                ) {
                    continue;
                }

                const existing =
                    await News.findOne({
                        title: article.title
                    });

                if(existing) {
                    continue;
                }

                // ==========================
                // Dynamic Source Logic
                // ==========================

                const sourceName =
                    article.source?.name ||
                    "Unknown";

                let source =
                    await Source.findOne({
                        name: sourceName
                    });

                if(!source) {

                    const maxSource =
                        await Source.findOne({
                            id: { $exists: true }
                        })
                        .sort({ id: -1 });

                    source =
                        await Source.create({

                            id:
                                maxSource
                                ? maxSource.id + 1
                                : 1,

                            name:
                                sourceName,

                            url:
                                article.url || "",

                            type:
                                "News"
                        });
                }

                // ==========================
                // Save News
                // ==========================

                newsToInsert.push({

                    id: nextId++,

                    title:
                        article.title,

                    summary:
                        article.description,

                    content:
                        article.content,

                    url:
                        article.url || "",

                    image_url:
                        article.urlToImage || "",

                    source_id:
                        source.id,

                    category_id:
                        i + 1
                });
            }
        }

        if(newsToInsert.length > 0) {

            await News.insertMany(
                newsToInsert
            );

            for(const article of newsToInsert) {

                const embedding =
                await getEmbedding(

                    article.title +
                    " " +
                    article.summary
                );

                await ArticleEmbedding.create({

                    article_id:
                        article.id,

                    title:
                        article.title,

                    embedding
                });
            }
        }

        response = {
            code: 200,
            message:
                `${newsToInsert.length} News Articles Fetched And Saved Successfully`
        };

    } catch(error) {

        console.log(error);

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const getArticlesByCategory =
async (category, page, limit) => {

    let response = {};

    try {

        const skip =
            (page - 1) * limit;

        const news =
            await News.find({
                category_id:
                    parseInt(category)
            })
            .skip(skip)
            .limit(limit);

        response = {
            code: 200,
            news: news
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const getArticlesBySource =
async (source, page, limit) => {

    let response = {};

    try {

        const skip =
            (page - 1) * limit;

        const news =
            await News.find({
                source_id:
                    parseInt(source)
            })
            .skip(skip)
            .limit(limit);

        const totalrecords =
            await News.countDocuments({
                source_id:
                    parseInt(source)
            });

        response = {
            code: 200,
            news: news,
            totalpages:
                Math.ceil(
                    totalrecords / limit
                )
        };

    } catch (error) {

        response = {
            code: 500,
            message: error.message
        };
    }

    return response;
};
export const saveReadingActivity =
async (data) => {

    let response = {};

    try {

        await ReadingActivity.create({

    user_email:
        data.user_email,

    article_id:
        data.article_id,

    article_title:
        data.article_title
});

        response = {

            code: 200,

            message:
            "Reading Activity Saved Successfully"
        };

    } catch(error) {

        response = {

            code: 500,

            message:
            error.message
        };
    }

    return response;
};
export const semanticSearch =
async (query) => {

    let response = {};

    try {

        const queryEmbedding =
        await getEmbedding(query);

        const results =
        await ArticleEmbedding.aggregate([

            {
                $vectorSearch: {

                    index:
                    "vector_index",

                    path:
                    "embedding",

                    queryVector:
                    queryEmbedding,

                    numCandidates:
                    100,

                    limit:
                    10
                }
            }
        ]);

        const articleIds =
        results.map(
            item =>
            item.article_id
        );

        const news =
        await News.find({

            id: {
                $in:
                articleIds
            }
        });

        response = {

            code: 200,

            news
        };

    } catch(error) {

        console.log(error);

        response = {

            code: 500,

            message:
            error.message
        };
    }

    return response;
};