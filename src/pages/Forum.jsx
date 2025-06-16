import React, { useState, useEffect, useCallback } from 'react';
import { FaLeaf, FaRecycle, FaSeedling, FaHeart, FaRegHeart, FaComment, FaUser, FaSearch, FaPlusCircle } from 'react-icons/fa';
import "../styles/Forum.css";
import axiosInstance from "../services/axios"; // Import axiosInstance

const ForumDiskusi = () => {
    const [activeCategory, setActiveCategory] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [comments, setComments] = useState({}); // Stores comments for each thread: {threadId: [comment1, comment2]}
    const [likes, setLikes] = useState({}); // Stores user's liked status for each thread: {threadId: boolean}
    const [newCommentContent, setNewCommentContent] = useState('');
    const [showAddForumModal, setShowAddForumModal] = useState(false);
    const [newThreadForm, setNewThreadForm] = useState({
        title: '',
        author: '',
        category: 'pengelolaan-sampah',
        content: ''
    });
    const [showCommentBox, setShowCommentBox] = useState(null); // ID of the thread whose comment box is open
    const [threads, setThreads] = useState([]); // Threads fetched from API

    // No need for API_BASE_URL here, axiosInstance handles it

    // Memoized fetch function for threads
    const fetchThreads = useCallback(async () => {
        try {
            // Use axiosInstance for GET request
            const response = await axiosInstance.get('/threads');
            const fetchedThreads = response.data.map(thread => ({
                ...thread,
                // Ensure that likes and comments count are numbers
                likes: Number(thread.likes_count || 0),
                comments: Number(thread.comments_count || 0),
                date: new Date(thread.post_date).toISOString().split('T')[0] // Format date
            }));
            setThreads(fetchedThreads);

            // Initialize comments and likes state
            const initialCommentsState = {};
            const initialLikesState = {};
            fetchedThreads.forEach(thread => {
                initialCommentsState[thread.id] = [];
                initialLikesState[thread.id] = false; // Default to not liked
            });
            setComments(initialCommentsState);
            setLikes(initialLikesState);

            // Fetch comments for each thread after initial load
            fetchedThreads.forEach(thread => fetchCommentsForThread(thread.id));

        } catch (error) {
            console.error("Error fetching threads:", error);
            alert("Gagal memuat topik diskusi.");
        }
    }, []); // Empty dependency array means this function is created once

    // Fetch comments for a specific thread
    const fetchCommentsForThread = async (threadId) => {
        try {
            // Use axiosInstance for GET request
            const response = await axiosInstance.get(`/threads/${threadId}/comments`);
            setComments(prev => ({
                ...prev,
                [threadId]: response.data.map(comment => ({
                    ...comment,
                    date: new Date(comment.comment_date).toISOString().split('T')[0] // Format date
                }))
            }));
        } catch (error) {
            console.error(`Error fetching comments for thread ${threadId}:`, error);
            // Optionally, show an error message to the user
            // alert("Gagal memuat komentar.");
        }
    };

    // Effect hook to call fetchThreads on component mount
    useEffect(() => {
        fetchThreads();
    }, [fetchThreads]); // fetchThreads is now a dependency

    const filteredThreads = threads.filter(thread => {
        const matchesCategory = activeCategory === 'semua' || thread.category === activeCategory;
        const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thread.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleLike = async (threadId) => {
        const currentLikedStatus = likes[threadId];
        const action = currentLikedStatus ? 'unlike' : 'like';

        // Optimistic UI update
        setLikes(prev => ({
            ...prev,
            [threadId]: !currentLikedStatus
        }));
        setThreads(prev => prev.map(thread => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    likes: currentLikedStatus ? thread.likes - 1 : thread.likes + 1
                };
            }
            return thread;
        }));

        try {
            // Use axiosInstance for POST request
            const response = await axiosInstance.post(`/threads/${threadId}/like`, { action });
            // Backend should return the new count, use it to ensure sync
            setThreads(prev => prev.map(thread => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        likes: response.data.newLikesCount // Use count from backend
                    };
                }
                return thread;
            }));
        } catch (error) {
            console.error("Error toggling like:", error);
            alert("Gagal memperbarui status like.");
            // Revert UI on error
            setLikes(prev => ({
                ...prev,
                [threadId]: currentLikedStatus
            }));
            setThreads(prev => prev.map(thread => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        likes: currentLikedStatus ? thread.likes + 1 : thread.likes - 1
                    };
                }
                return thread;
            }));
        }
    };

    const handleAddComment = async (threadId) => {
        if (newCommentContent.trim() === '') {
            alert("Komentar tidak boleh kosong.");
            return;
        }

        const commentAuthor = "Pengguna Anonim"; // Static author for comments for simplicity

        try {
            // Use axiosInstance for POST request
            const response = await axiosInstance.post(`/threads/${threadId}/comments`, {
                author: commentAuthor,
                content: newCommentContent
            });
            const addedComment = {
                ...response.data.comment,
                date: new Date(response.data.comment.comment_date).toISOString().split('T')[0]
            };

            setComments(prev => ({
                ...prev,
                [threadId]: [...prev[threadId], addedComment]
            }));

            setThreads(prev => prev.map(thread => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        comments: response.data.newCommentsCount // Update count from backend
                    };
                }
                return thread;
            }));
            setNewCommentContent('');
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Gagal menambahkan komentar. Silakan coba lagi.");
        }
    };

    const handleAddThread = async (e) => {
        e.preventDefault();
        try {
            // Use axiosInstance for POST request
            const response = await axiosInstance.post('/threads', newThreadForm);
            const newThread = {
                ...response.data,
                likes: Number(response.data.likes_count || 0), // Ensure numbers
                comments: Number(response.data.comments_count || 0),
                date: new Date(response.data.post_date).toISOString().split('T')[0]
            };
            setThreads(prev => [newThread, ...prev]);
            setComments(prev => ({ ...prev, [newThread.id]: [] }));
            setLikes(prev => ({ ...prev, [newThread.id]: false }));
            setNewThreadForm({ title: '', author: '', category: 'pengelolaan-sampah', content: '' });
            setShowAddForumModal(false);
            alert("Topik forum berhasil ditambahkan!");
        } catch (error) {
            console.error("Error adding new thread:", error);
            alert("Gagal menambahkan topik forum. Silakan coba lagi.");
        }
    };

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'pengelolaan-sampah': return <FaRecycle />;
            case 'tanaman': return <FaSeedling />;
            case 'eco-lifestyle': return <FaLeaf />;
            default: return <FaLeaf />;
        }
    };

    return (
        <div className="forumdiskusi-container">
            {/* Header */}
            <header className="forumdiskusi-header">
                <div className="forumdiskusi-header-content">
                    <h1 className="forumdiskusi-title">
                        <FaLeaf className="forumdiskusi-title-icon" /> Forum Lingkungan Relawan
                    </h1>
                    <p className="forumdiskusi-subtitle">Menjaga Lingkungan & Bumi Lebih Sehat</p>

                    <div className="forumdiskusi-auth">
                        <button onClick={() => setShowAddForumModal(true)} className="forumdiskusi-auth-button forumdiskusi-add-thread">
                            <FaPlusCircle /> Tambah Forum
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="forumdiskusi-main">
                {/* Sidebar */}
                <aside className="forumdiskusi-sidebar">
                    <div className="forumdiskusi-sidebar-section">
                        <h3 className="forumdiskusi-sidebar-title">Kategori</h3>
                        <ul className="forumdiskusi-category-list">
                            <li
                                className={`forumdiskusi-category-item ${activeCategory === 'semua' ? 'active' : ''}`}
                                onClick={() => setActiveCategory('semua')}
                            >
                                <FaLeaf /> Semua Topik
                            </li>
                            <li
                                className={`forumdiskusi-category-item ${activeCategory === 'pengelolaan-sampah' ? 'active' : ''}`}
                                onClick={() => setActiveCategory('pengelolaan-sampah')}
                            >
                                <FaRecycle /> Pengelolaan Sampah
                            </li>
                            <li
                                className={`forumdiskusi-category-item ${activeCategory === 'tanaman' ? 'active' : ''}`}
                                onClick={() => setActiveCategory('tanaman')}
                            >
                                <FaSeedling /> Tanaman
                            </li>
                            <li
                                className={`forumdiskusi-category-item ${activeCategory === 'eco-lifestyle' ? 'active' : ''}`}
                                onClick={() => setActiveCategory('eco-lifestyle')}
                            >
                                <FaLeaf /> Eco Lifestyle
                            </li>
                        </ul>
                    </div>

                    <div className="forumdiskusi-sidebar-section">
                        <h3 className="forumdiskusi-sidebar-title">Statistik Forum</h3>
                        <div className="forumdiskusi-stats-container">
                            <div className="forumdiskusi-stat-item">
                                <span className="forumdiskusi-stat-number">{threads.length}</span>
                                <span className="forumdiskusi-stat-label">Topik Diskusi</span>
                            </div>
                            <div className="forumdiskusi-stat-item">
                                <span className="forumdiskusi-stat-number">
                                    {threads.reduce((sum, thread) => sum + thread.comments, 0)}
                                </span>
                                <span className="forumdiskusi-stat-label">Komentar</span>
                            </div>
                            <div className="forumdiskusi-stat-item">
                                <span className="forumdiskusi-stat-number">
                                    {threads.reduce((sum, thread) => sum + thread.likes, 0)}
                                </span>
                                <span className="forumdiskusi-stat-label">Suka</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Discussion Area */}
                <section className="forumdiskusi-discussion-area">
                    <div className="forumdiskusi-search-bar">
                        <FaSearch className="forumdiskusi-search-icon" />
                        <input
                            type="text"
                            placeholder="Cari topik diskusi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="forumdiskusi-search-input"
                        />
                    </div>

                    {filteredThreads.length === 0 ? (
                        <div className="forumdiskusi-no-results">
                            <FaSearch className="forumdiskusi-no-results-icon" />
                            <p>Tidak ada hasil yang ditemukan untuk pencarian Anda.</p>
                        </div>
                    ) : (
                        <div className="forumdiskusi-threads-list">
                            {filteredThreads.map(thread => (
                                <div key={thread.id} className="forumdiskusi-thread-card">
                                    <div className="forumdiskusi-thread-header">
                                        <span className="forumdiskusi-thread-category">
                                            {getCategoryIcon(thread.category)}
                                            {thread.category === 'pengelolaan-sampah' ? 'Pengelolaan Sampah' :
                                               thread.category === 'tanaman' ? 'Tanaman' : 'Eco Lifestyle'}
                                        </span>
                                        <span className="forumdiskusi-thread-date">{thread.date}</span>
                                    </div>

                                    <h3 className="forumdiskusi-thread-title">{thread.title}</h3>
                                    <p className="forumdiskusi-thread-author">Oleh: {thread.author}</p>

                                    <div className="forumdiskusi-thread-content">
                                        <p>{thread.content}</p>
                                    </div>

                                    <div className="forumdiskusi-thread-actions">
                                        <button
                                            className={`forumdiskusi-like-button ${likes[thread.id] ? 'liked' : ''}`}
                                            onClick={() => handleLike(thread.id)}
                                        >
                                            {likes[thread.id] ? <FaHeart /> : <FaRegHeart />}
                                            <span>{thread.likes}</span>
                                        </button>

                                        <button
                                            className="forumdiskusi-comment-button"
                                            onClick={() => {
                                                setShowCommentBox(showCommentBox === thread.id ? null : thread.id);
                                                if (showCommentBox !== thread.id) {
                                                    fetchCommentsForThread(thread.id); // Fetch comments when opening
                                                }
                                            }}
                                        >
                                            <FaComment />
                                            <span>{thread.comments}</span>
                                        </button>
                                    </div>

                                    {/* Comment Section */}
                                    {showCommentBox === thread.id && (
                                        <div className="forumdiskusi-comment-section">
                                            <div className="forumdiskusi-comments-list">
                                                {comments[thread.id] && comments[thread.id].length > 0 ? (
                                                    comments[thread.id].map((comment, index) => (
                                                        <div key={index} className="forumdiskusi-comment-item">
                                                            <div className="forumdiskusi-comment-header">
                                                                <FaUser className="forumdiskusi-comment-avatar" />
                                                                <span className="forumdiskusi-comment-author">{comment.author}</span>
                                                                <span className="forumdiskusi-comment-date">{comment.date}</span>
                                                            </div>
                                                            <p className="forumdiskusi-comment-content">{comment.content}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="forumdiskusi-no-comments">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                                                )}
                                            </div>

                                            <div className="forumdiskusi-add-comment">
                                                <textarea
                                                    placeholder="Tulis komentar Anda..."
                                                    value={newCommentContent}
                                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                                    className="forumdiskusi-comment-input"
                                                />
                                                <button
                                                    onClick={() => handleAddComment(thread.id)}
                                                    className="forumdiskusi-submit-comment"
                                                >
                                                    Kirim
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Add Forum Modal */}
            {showAddForumModal && (
                <div className="forumdiskusi-login-modal"> {/* Reusing modal styles */}
                    <div className="forumdiskusi-modal-content">
                        <button
                            className="forumdiskusi-close-modal"
                            onClick={() => setShowAddForumModal(false)}
                        >
                            &times;
                        </button>

                        <h2 className="forumdiskusi-modal-title">Buat Topik Forum Baru</h2>
                        <p className="forumdiskusi-modal-subtitle">Isi detail di bawah untuk membuat topik diskusi baru</p>

                        <form onSubmit={handleAddThread} className="forumdiskusi-login-form">
                            <div className="forumdiskusi-form-group">
                                <label htmlFor="new-thread-title">Judul Topik</label>
                                <input
                                    type="text"
                                    id="new-thread-title"
                                    value={newThreadForm.title}
                                    onChange={(e) => setNewThreadForm({...newThreadForm, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="forumdiskusi-form-group">
                                <label htmlFor="new-thread-author">Nama Penulis</label>
                                <input
                                    type="text"
                                    id="new-thread-author"
                                    value={newThreadForm.author}
                                    onChange={(e) => setNewThreadForm({...newThreadForm, author: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="forumdiskusi-form-group">
                                <label htmlFor="new-thread-category">Kategori</label>
                                <select
                                    id="new-thread-category"
                                    value={newThreadForm.category}
                                    onChange={(e) => setNewThreadForm({...newThreadForm, category: e.target.value})}
                                    required
                                >
                                    <option value="pengelolaan-sampah">Pengelolaan Sampah</option>
                                    <option value="tanaman">Tanaman</option>
                                    <option value="eco-lifestyle">Eco Lifestyle</option>
                                </select>
                            </div>

                            <div className="forumdiskusi-form-group">
                                <label htmlFor="new-thread-content">Isi Konten</label>
                                <textarea
                                    id="new-thread-content"
                                    value={newThreadForm.content}
                                    onChange={(e) => setNewThreadForm({...newThreadForm, content: e.target.value})}
                                    required
                                    rows="6"
                                ></textarea>
                            </div>

                            <button type="submit" className="forumdiskusi-login-submit">
                                Buat Forum
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumDiskusi;