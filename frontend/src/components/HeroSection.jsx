const HeroSection = () => {

    return (

        <div className="hero-section">

            <div className="hero-overlay">
<h1>

    Stay Updated With

    <span> Real-Time News</span>

</h1>
                
                <button
    className="explore-btn"
    onClick={() => {

        document
            .getElementById(
                "news-section"
            )
            ?.scrollIntoView({

                behavior: "smooth"
            });

    }}
>

    Explore News

</button>
            </div>

        </div>
    );
}

export default HeroSection;