const NewsCard = ({
    article,
    categoryMap,
    addBookmark
}) => {

    if (!article)
        return null;
    return (

    <div className="news-grid">

        {
            articles.map((a) => (

                <div
                    key={a.id}

                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <h1>
                        {a.title}
                    </h1>

                    <img
                        src={a.imageUrl}
                        style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover"
                        }}
                    />

                </div>

            ))
        }

    </div>
);

}

export default NewsCard;