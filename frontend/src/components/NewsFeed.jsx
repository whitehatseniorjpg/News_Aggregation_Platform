import React, { useEffect, useState } from 'react';

import './NewsFeed.css';

import { apibaseurl, callApi } from '../lib';

import ProgressBar from './ProgressBar';

import HeroSection from './HeroSection';
import CategoryBar from './CategoryBar';
import NewsGrid from './NewsGrid';
import Footer from './Footer';

const NewsFeed = ({ token, logout }) => {

    const [articles, setArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);
   const [categories] = useState([
    { id: 1, category: "Sports" },
    { id: 2, category: "Technology" },
    { id: 3, category: "Business" },
    { id: 4, category: "Health" },
    { id: 5, category: "Science" },
    { id: 6, category: "Entertainment" },
    { id: 7, category: "Politics" }
]);
    const [isProgress, setIsProgress] = useState(false);

    const [page, setPage] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState("");

    const [searchKeyword, setSearchKeyword] = useState("");

    const limit = 10;

    const categoryMap = {
        1: "Sports",
        2: "Technology",
        3: "Business",
        4: "Health",
        5: "Science",
        6: "Entertainment",
        7: "Politics"
    };

    useEffect(() => {

        const storedtoken =
            localStorage.getItem("token");

        if (!storedtoken)
            return logout();

        loadArticles(
            storedtoken,
            1,
            "",
            ""
        );

    }, []);

   function loadArticles(
    storedtoken,
    pg,
    category,
    keyword
    
) {

    setIsProgress(true);

    const t = storedtoken || token;

    let url = "";

    // SEARCH
    if (keyword) {

        url =
        `${apibaseurl}/newsservice/search/${keyword}/${pg}/${limit}`;
    }

    // CATEGORY
    else if (category) {

    url =
    `${apibaseurl}/newsservice/getarticlesbycategory/${category}/${pg}/${limit}`;

}

    // ALL NEWS
    else {

        url =
        `${apibaseurl}/newsservice/getarticles/${pg}/${limit}`;
    }
    console.log(t);
    callApi(
        "GET",
        url,
        null,
        null,

        (res) => {

            setIsProgress(false);

            setLoaded(true);

            setArticles(
                res.news ||
                res.articles ||
                []
            );
        },

        t
    );
}

    function handleSearch() {

        if (!searchKeyword.trim())
            return;

        setSelectedCategory("");

        setPage(1);

        loadArticles(
            token,
            1,
            "",
            searchKeyword.trim()
        );
    }

    function addBookmark(articleId) {

        callApi(
            "POST",

            apibaseurl +
            "/bookmarkservice/addbookmark",

            {
                article_id: articleId
            },

            null,

            (res) => {
                alert(res.message);
            },

            token
        );
    }

    function handlePrev() {

        if (page <= 1)
            return;

        const newPage = page - 1;

        setPage(newPage);

        loadArticles(
            token,
            newPage,
            selectedCategory,
            searchKeyword
        );
    }

    function handleNext() {

        const newPage = page + 1;

        setPage(newPage);

        loadArticles(
            token,
            newPage,
            selectedCategory,
            searchKeyword
        );
    }

    return (

        <div className='newsfeed'>

            <HeroSection />
            <div id="news-section">

            <div className='newsfeed-toolbar'>

                <div className='search-group'>

                    <input
                        type='text'
                        placeholder='Search latest news...'

                        value={searchKeyword}

                        onChange={(e) =>
                            setSearchKeyword(e.target.value)
                        }

                        onKeyDown={(e) =>
                            e.key === 'Enter'
                            && handleSearch()
                        }
                    />

                    <button
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>

            </div>
</div>
            <CategoryBar
                categories={categories}

                selectedCategory={selectedCategory}

                onSelect={(cat) => {

                    setSelectedCategory(cat);

                    setPage(1);

                    loadArticles(
                        token,
                        1,
                        cat,
                        ""
                    );
                }}
            />

           {
    loaded &&
    !isProgress &&
    articles.length === 0 &&

    <div className='no-data'>
        No articles found.
    </div>
}
{
     <div className="news-grid">

{
    articles.map((a) => (

        <div
            key={a.id}

            className="news-card"
        >

            <img
                src={
                    a.image_url ||
                    a.imageUrl ||
                    "https://via.placeholder.com/400x240"
                }

                alt="news"
            />

            <div className="news-card-content">

                <span className="news-category">

                    {
                        categoryMap[
                            a.category_id ||
                            a.categoryId
                        ] || "News"
                    }

                </span>

                <h2>
                    {a.title}
                </h2>

                <p>
                    {
                        a.summary ||
                        "No summary available"
                    }
                </p>

                <div className="news-actions">

                    <a
                        href={
                            a.url || "#"
                        }

                        target="_blank"

                        rel="noreferrer"
                    >
                        Read More
                    </a>

                    <button
                        onClick={() =>
                            addBookmark(a.id)
                        }
                    >
                        Bookmark
                    </button>

                </div>

            </div>

        </div>

    ))
}

</div>

    
}
            <div className='pagination'>

                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>
                    Page {page}
                </span>

                <button
                    onClick={handleNext}
                    disabled={articles.length < limit}
                >
                    Next
                </button>

            </div>

            <Footer />

            <ProgressBar
                isProgress={isProgress}
            />

        </div>
    );
}

export default NewsFeed;