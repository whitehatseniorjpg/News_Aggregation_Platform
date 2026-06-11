import React, { useEffect, useState } from 'react';
import './Home.css';
import { apibaseurl, callApi, imgurl } from '../lib';
import ProgressBar from './ProgressBar';
import Profile from './Profile';
import NewsFeed from './NewsFeed';
import Bookmarks from './Bookmarks';
import NewsManager from './NewsManager';
import ManageUsers from './ManageUsers';

const Home = () => {
    const [fullname, setFullname] = useState("");
    const [isProgress, setIsProgress] = useState(false);
    const [token, setToken] = useState("");
    const [menuList, setMenuList] = useState([]);
    const [activeComponent, setActiveComponent] = useState(null);
    const [activeMenu, setActiveMenu] = useState(0);

    useEffect(() => {
        const storedtoken = localStorage.getItem("token");
        if (!storedtoken)
            logout();
        else {
            setToken(storedtoken);
            setIsProgress(true);
            callApi("GET", apibaseurl + "/authservice/uinfo", null, null, loadUinfo, storedtoken);
        }
    }, []);

   function loadUinfo(res) {

    setIsProgress(false);

    if (res.code != 200)
        return;

    setFullname(res.fullname);

    setMenuList(res.menulist);

    const t = localStorage.getItem("token");

    loadModule(1, t);
}

    function logout() {
        localStorage.clear();
        window.location.replace("/");
    }

  function loadModule(mid, storedToken) {

    setIsProgress(true);

    setActiveMenu(mid);

    const t =
        storedToken || token;

    const component = {

        1:
        <NewsFeed
            token={t}
            logout={logout}
        />,

        2:
        <Bookmarks
            token={t}
            logout={logout}
        />,

        3:
        <Profile
            logout={logout}
        />,

        4:
        <NewsManager
            token={t}
            logout={logout}
        />,

        5:
        <ManageUsers
            token={t}
            logout={logout}
        />
    };

    setActiveComponent(
        component[mid]
    );

    setIsProgress(false);
}
    return (
        <div className='home'>
            <div className='modern-header'>

    <div className='logo-section'>

       <div className='brand-logo'>
    NS
</div>

        <h1>
            NewsSphere
        </h1>

    </div>

    <div className="header-buttons">

    {
        menuList.map((m) => (

            <button
                key={m.mid}
                className={
                    activeMenu === m.mid
                    ? "active-btn"
                    : ""
                }
                onClick={() =>
                    loadModule(m.mid)
                }
            >

                {m.menu}

            </button>
        ))
    }

    <button
        className="logout-btn-top"
        onClick={logout}
    >

        Logout

    </button>

</div>

</div>
            <div className='home-content-full'>
                <div className='home-content-full'>
    {activeComponent}
</div>
            </div>
                        <ProgressBar isProgress={isProgress} />
        </div>
    );
}

export default Home;