import { useEffect, useState } from 'react';

import './NewsFeed.css';

import { apibaseurl, callApi } from '../lib';

import ProgressBar from './ProgressBar';

import HeroSection from './HeroSection';
import CategoryBar from './CategoryBar';
import Footer from './Footer';

const NewsFeed = ({ token, logout }) => {

    const [articles, setArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);
   const [categories,setCategories] = useState([]);
    const [isProgress, setIsProgress] = useState(false);

    const [page, setPage] = useState(1);
    const getCategoryName = (id) => {

        const category =
            categories.find(
                c => c.id === id
            );

        return category
            ? category.category
            : "News";
    };

    const [selectedCategory, setSelectedCategory] = useState("");

    const [searchKeyword, setSearchKeyword] = useState("");

    const limit = 10;
    
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

    loadCategories(
        storedtoken
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

    let url;

    // SEMANTIC SEARCH
if (keyword) {

    url =
    `${apibaseurl}/newsservice/semanticsearch/${keyword}`;
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
function loadCategories(storedtoken) {

    callApi(
        "GET",
        apibaseurl + "/newsservice/getcategories",
        null,
        null,

        (res) => {

            setCategories(
                res.categories || []
            );
        },

        storedtoken || token
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

    function addBookmark(article) {
        console.log("Article:", article);

    callApi(
        "POST",
        apibaseurl + "/bookmarkservice/addbookmark",

        {
            articleId: article.id,
            title: article.title,
            summary: article.summary,
            url: article.url,
            imageUrl: article.imageUrl,
            category: article.category,
            source: article.source,
            published_at: article.published_at
        },

        null,
(res) => {
    console.log("Bookmark Response:", res);
    alert(
    "Article bookmarked successfully!"
);
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

               <div className="search-box-wrapper">

    <h2>
        AI Powered Semantic Search
    </h2>

    <p>
        Search using HuggingFace Embeddings
        and MongoDB Atlas Vector Search
    </p>

    <div className="search-group">

        <input
            type="text"
            placeholder="Search latest news..."
            value={searchKeyword}
            onChange={(e) =>
                setSearchKeyword(
                    e.target.value
                )
            }
            onKeyDown={(e) =>
                e.key === "Enter" &&
                handleSearch()
            }
        />

        <button
            onClick={handleSearch}
        >
            Semantic Search
        </button>

    </div>

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
        getCategoryName(
            a.category_id ||
            a.categoryId
        )
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

    onClick={() => {

        callApi(

            "POST",

            apibaseurl +
            "/newsservice/savereadingactivity",

            {

                article_id:
                    a.id,

                article_title:
                    a.title

            },

            null,

            (res) => {

                console.log(
                    res
                );
            },

            token
        );
    }}
>
    Read More
</a>

                    <button
                        onClick={() =>
                            addBookmark(a)
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
    disabled={
        page === 1 ||
        searchKeyword
    }
>
    Previous
</button>

<span>
    Page {page}
</span>

<button
    onClick={handleNext}
    disabled={
        searchKeyword ||
        articles.length < limit
    }
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
