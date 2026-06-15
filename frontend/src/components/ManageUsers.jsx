import { useEffect, useState } from 'react';
import './ManageUsers.css';
import { apibaseurl, callApi } from '../lib';
import ProgressBar from './ProgressBar';

const ManageUsers = ({ token, logout }) => {

    const [users, setUsers] = useState([]);
    const [isProgress, setIsProgress] = useState(false);

    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({

        fullname: "",
        email: "",
        phone: "",
        role: 2,
        password: ""
    });

    useEffect(() => {

        const storedtoken =
            localStorage.getItem("token");

        if (!storedtoken)
            return logout();

        loadUsers(storedtoken);

    }, []);

    function loadUsers(storedtoken) {

        setIsProgress(true);

        callApi(
            "GET",
            apibaseurl +
            "/authservice/getallusers/1/20",
            null,
            null,

            (res) => {

                setIsProgress(false);

                setUsers(
                    res.users || []
                );
            },

            storedtoken || token
        );
    }

    function handleInput(e) {

        const { name, value } = e.target;

        setForm({

            ...form,
            [name]: value
        });
    }

    function editUser(u) {

        setEditId(u.id);

        setForm({

            fullname: u.fullname,
            email: u.email,
            phone: u.phone,
            role: u.role
        });

        window.scrollTo(0, 0);
    }

    function updateUser() {

        setIsProgress(true);

        callApi(
            "PUT",

            apibaseurl +
            "/authservice/updateuser/" +
            editId,

            form,

            null,

            (res) => {

                alert(
                    res.message
                );

                setIsProgress(false);

                resetForm();

                loadUsers(token);

            },

            token
        );
    }
    function addUser() {
console.log(apibaseurl);
        setIsProgress(true);

        callApi(
            "POST",

            apibaseurl +
            "/authservice/adduser",

            form,

            null,

            (res) => {

                alert(
                    res.message
                );

                setIsProgress(false);

                resetForm();

                loadUsers(token);

            },

            token
        );
    }
    function deleteUser(id) {

        if (
            !window.confirm(
                "Delete this user?"
            )
        ) return;

        setIsProgress(true);

        callApi(
            "DELETE",

            apibaseurl +
            "/authservice/deleteuser/" +
            id,

            null,
            null,

            (res) => {

                alert(
                    res.message
                );

                setIsProgress(false);

                loadUsers(token);

            },

            token
        );
    }

    function resetForm() {

        setEditId(null);

        setForm({

            fullname: "",
            email: "",
            phone: "",
            role: 2,
            password: ""
        });
    }

    return (

        <div className='manage-users'>

            {/* FORM */}

            <div className='mu-form'>

                <h2>

                    Manage Users

                </h2>

                <input
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    value={form.fullname}
                    onChange={handleInput}
                />

                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={form.email}
                    onChange={handleInput}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={form.password}
                    onChange={handleInput}
                />

                <input
                    type='text'
                    name='phone'
                    placeholder='Phone'
                    value={form.phone}
                    onChange={handleInput}
                />

                <select
    name='role'
    value={form.role}
    onChange={handleInput}
>

    <option value={2}>
        USER
    </option>

</select>

                <div className='mu-btns'>

                    {
                        editId
                            ?

                            <button
                                className='btn-update'
                                onClick={updateUser}
                            >

                                Update User

                            </button>

                            :

                            <button
                                className='btn-update'
                                onClick={addUser}
                            >

                                Add User

                            </button>
                    }

                    <button
                        className='btn-cancel'
                        onClick={resetForm}
                    >

                        Cancel

                    </button>

                </div>

            </div>

            {/* TABLE */}

            <div className='mu-table-container'>

                <table className='mu-table'>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Role</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            users
                                .filter((u) => u.role != 1)
                                .map((u) => (

                                    <tr key={u.id}>

                                        <td>{u.id}</td>

                                        <td>{u.fullname}</td>

                                        <td>{u.email}</td>

                                        <td>{u.phone}</td>

                                        <td>

                                            {
                                                u.role == 1
                                                    ? "ADMIN"
                                                    : "USER"
                                            }

                                        </td>

                                        <td>

                                            <button
                                                className='btn-edit'
                                                onClick={() =>
                                                    editUser(u)
                                                }
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className='btn-delete'
                                                onClick={() =>
                                                    deleteUser(u.id)
                                                }
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>
                                ))
                        }

                    </tbody>

                </table>

            </div>

            <ProgressBar
                isProgress={isProgress}
            />

        </div>
    );
}

export default ManageUsers;
