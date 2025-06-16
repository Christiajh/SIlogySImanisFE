// frontend/src/components/AdminUserTable.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axios'; // Import the axiosInstance
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminUserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Assuming axiosInstance is configured with an interceptor
                // to automatically attach the 'x-auth-token' from localStorage.
                // If not, you'd add it to the instance config (e.g., in services/axios.js)
                // or keep the manual header config here.
                
                // If your axiosInstance is set up to attach the token automatically,
                // you don't need this manual token check/config here.
                // However, for robustness, checking for token existence might still be wise
                // if the interceptor isn't guaranteed to always run or if this path
                // is specifically meant to fail early without a token.
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('Autentikasi diperlukan. Silakan login ulang.');
                    setLoading(false);
                    return;
                }

                // Make the GET request using axiosInstance
                // The base URL and the token header should be handled by axiosInstance
                const res = await axiosInstance.get('/admin/users');
                
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err.response ? err.response.data : err.message);
                // Adjust error message extraction for Axios response structure
                setError(err.response && err.response.data && err.response.data.msg ? err.response.data.msg : 'Gagal memuat daftar pengguna.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="admin-loading-indicator">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Memuat daftar pengguna...</p>
            </div>
        );
    }

    if (error) {
        return <p className="admin-error-message">{error}</p>;
    }

    return (
        <div className="admin-user-table-container">
            <h3>Daftar Pengguna Terdaftar ({users.length})</h3>
            {users.length === 0 ? (
                <p>Belum ada pengguna terdaftar.</p>
            ) : (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Daerah</th>
                                <th>Umur</th>
                                <th>Role</th>
                                <th>Tanggal Daftar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} data-label-username={user.username} data-label-daerah={user.daerah} data-label-umur={user.umur} data-label-role={user.role} data-label-tanggal-daftar={new Date(user.created_at).toLocaleDateString()}>
                                    <td data-label="Username">{user.username}</td>
                                    <td data-label="Daerah">{user.daerah}</td>
                                    <td data-label="Umur">{user.umur}</td>
                                    <td data-label="Role"><span className={`user-role-badge user-role-${user.role}`}>{user.role}</span></td>
                                    <td data-label="Tanggal Daftar">{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUserTable;