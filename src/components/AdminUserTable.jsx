// frontend/src/components/AdminUserTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminUserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('Autentikasi diperlukan. Silakan login ulang.');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const res = await axios.get('http://localhost:5000/api/admin/users', config);
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err.response ? err.response.data : err.message);
                setError(err.response && err.response.data ? err.response.data.msg : 'Gagal memuat daftar pengguna.');
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
                                <th>Daerah</th> {/* Tambah kolom Daerah */}
                                <th>Umur</th>    {/* Tambah kolom Umur */}
                                <th>Role</th>    {/* Tambah kolom Role */}
                                <th>Tanggal Daftar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} data-label-username={user.username} data-label-daerah={user.daerah} data-label-umur={user.umur} data-label-role={user.role} data-label-tanggal-daftar={new Date(user.created_at).toLocaleDateString()}> {/* ⭐ Tambah data-label untuk responsive */}
                                    <td data-label="Username">{user.username}</td>
                                    <td data-label="Daerah">{user.daerah}</td> {/* Tampilkan Daerah */}
                                    <td data-label="Umur">{user.umur}</td>     {/* Tampilkan Umur */}
                                    <td data-label="Role"><span className={`user-role-badge user-role-${user.role}`}>{user.role}</span></td> {/* Tampilkan Role */}
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