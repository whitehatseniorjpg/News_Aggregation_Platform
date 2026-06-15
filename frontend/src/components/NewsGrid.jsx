const NewsGrid = ({ articles = [] }) => {
    return (
        <div className="news-grid">
            {articles.map((article) => (
                <article className="news-card" key={article.id}>
                    <img
                        src={article.image_url || article.imageUrl || "https://via.placeholder.com/400x240"}
                        alt={article.title || "News"}
                    />
                    <div className="news-card-content">
                        <h2>{article.title}</h2>
                        <p>{article.summary || "No summary available"}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default NewsGrid;
