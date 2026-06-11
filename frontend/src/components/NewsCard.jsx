const NewsCard = ({
    article = {},
    categoryMap = {},
    addBookmark
}) => {

    return (

        <div className="news-card">

            <img
                src={
                    article.image_url &&
                        article.image_url !== "null"
                        ? article.image_url
                        : "https://via.placeholder.com/400x220?text=No+Image"
                }

                alt={article.title}

                className="news-image"

                onError={(e) => {

                    e.target.onerror = null;

                    e.target.src =
                        "https://via.placeholder.com/400x220?text=News";

                }}
            />
            <div
                className={`news-category ${article.category?.toLowerCase()}`}
            >

                {article.category}

            </div>

           <div className="news-card-content">
<span className="news-category">

    {
        categoryMap[
            article.category_id
        ] || "General"
    }

</span>
    <h2>
        {article.title}
    </h2>

    <p>
        {
            article.summary ||
            "No summary available."
        }
    </p>

    <div className="news-actions">

        <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
        >
            Read More
        </a>

        <button
            onClick={() =>
                addBookmark(article.id)
            }
        >
            Bookmark
        </button>

    </div>

</div>

        </div>
    );
}

export default NewsCard;