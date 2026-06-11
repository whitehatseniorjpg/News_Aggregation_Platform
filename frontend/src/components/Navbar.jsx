const Navbar = ({ logout }) => {

    return (

        <nav className="navbar">

            <div className="navbar-left">

                <h2 className="logo">
                    NewsSphere
                </h2>

            </div>

            <div className="navbar-right">

                <button className="nav-btn">
                    Home
                </button>

                <button className="nav-btn">
                    Bookmarks
                </button>

                <button className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;