import { useEffect, useState } from 'react';
import './NewsManager.css';
import { apibaseurl, callApi } from '../lib';
import ProgressBar from './ProgressBar';

const NewsManager = ({ token, logout }) => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [isProgress, setIsProgress] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;
    const getCategoryName = (id) => {

    const category =
        categories.find(
            c => c.id === id
        );

    return category
        ? category.category
        : id;
};

const getSourceName = (id) => {

    const source =
        sources.find(
            s => s.id === id
        );

    return source
        ? source.name
        : id;
};


    const emptyForm = { title: "", summary: "", content: "", url: "", image_url: "", source_id: "", category_id: "" };
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [errorData, setErrorData] = useState({});

  useEffect(() => {

    const storedtoken =
        localStorage.getItem("token");

    if (!storedtoken)
        return logout();

    loadArticles(storedtoken, 1);

    loadCategories(storedtoken);

    loadSources(storedtoken);

}, []);
    function loadArticles(storedtoken, pg) {

        setIsProgress(true);

        callApi(
            "GET",
            `${apibaseurl}/newsservice/getarticles/${pg}/${limit}`,
            null,
            null,

            (res) => {

                setIsProgress(false);

                if (res.code == 200) {

                    setArticles(
                        res.news || []
                    );

                } else {

                    setArticles([]);
                }
            },

            storedtoken || token
        );
    }
 function loadCategories(storedtoken) {

    callApi(
        "GET",
        apibaseurl + "/newsservice/getcategories",
        null,
        null,

        (res) => {

            console.log(res);

           setCategories(
    res.categories || []
);
        },

        storedtoken || token
    );
}
    function loadSources(storedtoken) {

    callApi(
        "GET",
        apibaseurl + "/newsservice/getsources",
        null,
        null,

        (res) => {

            console.log(res);

           setSources(
    res.sources || []
);
        },

        storedtoken || token
    );
}

    function handleInput(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function validate() {
        let errors = {};
        if (!form.title) errors.title = true;
        if (!form.summary) errors.summary = true;
        if (!form.url) errors.url = true;
        if (!form.source_id) errors.source_id = true;
        if (!form.category_id) errors.category_id = true;
        setErrorData(errors);
        return Object.keys(errors).length > 0;
    }

    function saveArticle() {
        if (validate()) return;
        setIsProgress(true);
        const payload = { ...form, source_id: parseInt(form.source_id), category_id: parseInt(form.category_id) };
        if (editId) {
            callApi("PUT", `${apibaseurl}/newsservice/updatearticle/${editId}`, payload, null, (res) => {
                alert(res.message);
                setIsProgress(false);
                resetForm();
                loadArticles(token, page);
            }, token);
        } else {
            callApi("POST", apibaseurl + "/newsservice/savearticle", payload, null, (res) => {
                alert(res.message);
                setIsProgress(false);
                resetForm();
                loadArticles(token, page);
            }, token);
        }
    }

    function editArticle(a) {
        setEditId(a.id);
        setForm({
            title: a.title,
            summary: a.summary,
            content: a.content || "",
            url: a.url,
            image_url: a.image_url || "",
            source_id: a.source_id,
            category_id: a.category_id
        });
        setErrorData({});
        window.scrollTo(0, 0);
    }

    function deleteArticle(id) {
        if (!window.confirm("Delete this article?")) return;
        setIsProgress(true);
        callApi("DELETE", `${apibaseurl}/newsservice/deletearticle/${id}`, null, null, (res) => {
            alert(res.message);
            setIsProgress(false);
            loadArticles(token, page);
        }, token);
    }

    function resetForm() {
        setForm(emptyForm);
        setEditId(null);
        setErrorData({});
    }

    function handlePrev() {
        if (page <= 1) return;
        const p = page - 1;
        setPage(p);
        loadArticles(token, p);
    }

    function handleNext() {
        const p = page + 1;
        setPage(p);
        loadArticles(token, p);
    }

    return (
        <div className='newsmanager'>

            {/* Form */}
            <div className='nm-form'>
                <label className='nm-title'>{editId ? "Edit Article" : "Add New Article"}</label>

                <label>Title*</label>
                <input type='text' name='title' className={errorData.title ? 'error' : ''} placeholder='Article title' value={form.title} onChange={handleInput} />

                <label>Summary*</label>
                <textarea name='summary' className={errorData.summary ? 'error' : ''} placeholder='Short summary' value={form.summary} onChange={handleInput} rows={2} />

                <label>Content</label>
                <textarea name='content' placeholder='Full article content' value={form.content} onChange={handleInput} rows={4} />

                <label>URL*</label>
                <input type='text' name='url' className={errorData.url ? 'error' : ''} placeholder='Article URL' value={form.url} onChange={handleInput} />

                <label>Image URL</label>
                <input type='text' name='image_url' placeholder='Image URL (optional)' value={form.image_url} onChange={handleInput} />

                <div className='nm-row'>

    {/* CATEGORY */}

    <div>

        <label>Category*</label>

        <select
            name='category_id'
            className={
                errorData.category_id
                ? 'error'
                : ''
            }
            value={form.category_id}
            onChange={handleInput}
        >

            <option value="">
                Select category
            </option>

            {
                categories?.map((c) => (

                    <option
                        key={c.id}
                        value={c.id}
                    >

                        {c.category}

                    </option>
                ))
            }

        </select>

    </div>

    {/* SOURCE */}

    <div>

        <label>Source*</label>

        <select
            name='source_id'
            className={
                errorData.source_id
                ? 'error'
                : ''
            }
            value={form.source_id}
            onChange={handleInput}
        >

            <option value="">
                Select source
            </option>

            {
                sources?.map((s) => (

                    <option
                        key={s.id}
                        value={s.id}
                    >

                        {s.name}

                    </option>
                ))
            }

        </select>

    </div>

</div>
                <div className='nm-btns'>
                    <button className='btn-save' onClick={saveArticle}>{editId ? "Update" : "Save"}</button>
                    {editId && <button className='btn-cancel' onClick={resetForm}>Cancel</button>}
                </div>
            </div>

            {/* Table */}
            <div className='nm-table-container'>
                <table className='nm-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles?.length === 0 && (
                            <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-gray)' }}>No articles found</td></tr>
                        )}
                        {articles?.map((a, i) => (
                            <tr key={a.id}>
                                <td>{(page - 1) * limit + i + 1}</td>
                                <td>{a.title}</td>
                                

                                    <td>
    {getCategoryName(a.category_id)}
</td>

                                <td>
<td>
    {a.source_id} - {getSourceName(a.source_id)}
</td></td>
                                
                                <td>
                                    <button className='btn-edit' onClick={() => editArticle(a)}>Edit</button>
                                    <button className='btn-delete' onClick={() => deleteArticle(a.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='pagination'>
                <button onClick={handlePrev} disabled={page === 1}>Previous</button>
                <span>Page {page}</span>
                <button onClick={handleNext} disabled={articles.length < limit}>Next</button>
            </div>

            <ProgressBar isProgress={isProgress} />
        </div>
    );
}

export default NewsManager;
