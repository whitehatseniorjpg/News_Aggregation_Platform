import { useEffect, useState } from 'react';
import './Bookmarks.css';
import { apibaseurl, callApi } from '../lib';
import ProgressBar from './ProgressBar';

const Bookmarks = ({ token, logout }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isProgress, setIsProgress] = useState(false);

    useEffect(() => {
        const storedtoken = localStorage.getItem("token");
        if (!storedtoken) return logout();
        loadBookmarks(storedtoken);
    }, []);

    function loadBookmarks(storedtoken) {
        setIsProgress(true);
        callApi("GET", apibaseurl + "/bookmarkservice/getbookmarks", null, null, (res) => {
            setIsProgress(false);
            if (res.code == 200) setBookmarks(res.bookmarks);
            else setBookmarks([]);
        }, storedtoken || token);
    }

    function removeBookmark(id) {
        if (!window.confirm("Remove this bookmark?")) return;
        callApi("DELETE", apibaseurl + "/bookmarkservice/deletebookmark/" + id, null, null, (res) => {
            alert(res.message);
            loadBookmarks(token);
        }, token);
    }

    return (
        <div className='bookmarks'>
            <div className='bookmarks-header'>
                <label>My Bookmarks</label>
            </div>

            <div className='bookmark-list'>
                {bookmarks.length === 0 && !isProgress &&
                    <div className='no-data'>No bookmarks saved yet.</div>
                }
                {bookmarks.map((b) => (
                    <div className='bookmark-card' key={b.id}>
                        <div className='bookmark-info'>
                            <div className='bookmark-meta'>
                                <span className='badge'>{b.category}</span>
                                <span className='source'>{b.source}</span>
                                <span className='date'>{b.published_at}</span>
                            </div>
                            <h3>{b.title}</h3>
                            <p>{b.summary}</p>
                        </div>
                        <div className='bookmark-actions'>
                            <a href={b.url} target='_blank' rel='noreferrer'>Read</a>
                            <button onClick={() => removeBookmark(b.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <ProgressBar isProgress={isProgress} />
        </div>
    );
}

export default Bookmarks;
