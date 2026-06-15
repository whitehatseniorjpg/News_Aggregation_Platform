import express from "express";
import verifyToken
from "../middleware/authMiddleware.js";
import {
    saveArticle,
    getArticles,
    getArticle,
    getArticlesByCategory,
    getArticlesBySource,
    search,
    updateArticle,
    deleteArticle,
    fetchAndSaveNews,
    saveReadingActivity,
    semanticSearch
}
from "../service/newsService.js";

import {
    saveCategory,
    getCategories
}
from "../service/categoryServices.js";

import {
    saveSource,
    getSources
}
from "../service/sourceServices.js";

const router = express.Router();

router.post(
    "/savearticle",
    verifyToken,
    async (req, res) => {

        const response =
            await saveArticle(
                req.body,
                req.headers.token
            );

        res.json(response);
    }
);

router.get(
    "/getarticles/:page/:limit",
    async (req, res) => {

        const response =
            await getArticles(
                parseInt(req.params.page),
                parseInt(req.params.limit)
            );

        res.json(response);
    }
);

router.get(
    "/getarticle/:id",
    async (req, res) => {

        const response =
            await getArticle(
                req.params.id
            );

        res.json(response);
    }
);

router.get(
    "/getarticlesbycategory/:category/:page/:limit",
    async (req, res) => {

        const response =
            await getArticlesByCategory(
                parseInt(req.params.category)
            );

        res.json(response);
    }
);

router.get(
    "/search/:keyword/:page/:limit",
    async (req, res) => {

        const response =
            await search(
                req.params.keyword
            );

        res.json(response);
    }
);

router.put(
    "/updatearticle/:id",verifyToken,
    async (req, res) => {

        const response =
            await updateArticle(
                req.params.id,
                req.body
            );

        res.json(response);
    }
);

router.delete(
    "/deletearticle/:id",verifyToken,
    async (req, res) => {

        const response =
            await deleteArticle(
                req.params.id
            );

        res.json(response);
    }
);

router.get(
    "/fetchnews",verifyToken,
    async (req, res) => {

        const response =
            await fetchAndSaveNews();

        res.json(response);
    }
);

router.post(
    "/savecategory",verifyToken,
    async (req, res) => {

        const response =
            await saveCategory(
                req.body
            );

        res.json(response);
    }
);

router.get(
    "/getcategories",
    async (req, res) => {

        const response =
            await getCategories();

        res.json(response);
    }
);

router.post(
    "/savesource",verifyToken,
    async (req, res) => {

        const response =
            await saveSource(
                req.body
            );

        res.json(response);
    }
);

router.get(
    "/getsources",
    async (req, res) => {

        const response =
            await getSources();

        res.json(response);
    }
);

export default router;
router.get(
    "/getarticlesbysource/:source/:page/:limit",
    async (req, res) => {

        const response =
            await getArticlesBySource(
                req.params.source,
                parseInt(req.params.page),
                parseInt(req.params.limit)
            );

        res.json(response);
    }
);
router.get(
    "/getarticlesbycategory/:category/:page/:limit",
    async (req, res) => {

        const response =
            await getArticlesByCategory(
                req.params.category,
                parseInt(req.params.page),
                parseInt(req.params.limit)
            );

        res.json(response);
    }
);
router.post(
    "/savereadingactivity",
    verifyToken,

    async (req, res) => {

        req.body.user_email =
            req.user.un;

        const response =
            await saveReadingActivity(
                req.body
            );

        res.json(response);
    }
);
router.get(
    "/semanticsearch/:query",

    async (req, res) => {

        const response =

        await semanticSearch(
            req.params.query
        );

        res.json(response);
    }
);