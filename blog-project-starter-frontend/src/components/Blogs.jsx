import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// ✅ LIVE BACKEND URL
const BACKEND_URL = 'https://blog-portfolio-backend-n0r1.onrender.com';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // ⚠️ REPLACE THIS WITH YOUR ACTUAL ADMIN UID FROM FIREBASE CONSOLE
    const ADMIN_UID = "dAMJSuCCkkOoIrBySbgYt2QOiZA3";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && currentUser.uid === ADMIN_UID) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });

        fetchBlogs();
        return () => unsubscribe();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/blogs`);
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('Please login first!');
            return;
        }

        if (!isAdmin) {
            alert('Only admin can add blogs!');
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${BACKEND_URL}/api/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newTitle, newContent })
            });

            if (response.ok) {
                setNewTitle('');
                setNewContent('');
                fetchBlogs();
                alert('Blog added successfully!');
            } else {
                alert('Failed to add blog');
            }
        } catch (error) {
            console.error('Error adding blog:', error);
            alert('Error adding blog');
        }
    };

    const handleEditBlog = (blog) => {
        setEditingBlog(blog._id);
        setEditTitle(blog.newTitle);
        setEditContent(blog.newContent);
    };

    const handleUpdateBlog = async (e) => {
        e.preventDefault();

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${BACKEND_URL}/api/blogs/${editingBlog}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newTitle: editTitle, newContent: editContent })
            });

            if (response.ok) {
                setEditingBlog(null);
                setEditTitle('');
                setEditContent('');
                fetchBlogs();
                alert('Blog updated successfully!');
            } else {
                alert('Failed to update blog');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Error updating blog');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchBlogs();
                alert('Blog deleted successfully!');
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Error deleting blog');
        }
    };

    const handleLikeBlog = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/blogs/like/${id}`, {
                method: 'PATCH'
            });

            if (response.ok) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };

    const cancelEdit = () => {
        setEditingBlog(null);
        setEditTitle('');
        setEditContent('');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">
                Latest Blogs 📚
            </h1>

            {isAdmin && user && (
                <div className="max-w-4xl mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">
                        {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                    </h2>
                    <form onSubmit={editingBlog ? handleUpdateBlog : handleAddBlog}>
                        <input
                            type="text"
                            placeholder="Blog Title"
                            value={editingBlog ? editTitle : newTitle}
                            onChange={(e) => editingBlog ? setEditTitle(e.target.value) : setNewTitle(e.target.value)}
                            required
                            className="w-full p-3 mb-4 border rounded-lg"
                        />
                        <textarea
                            placeholder="Blog Content"
                            value={editingBlog ? editContent : newContent}
                            onChange={(e) => editingBlog ? setEditContent(e.target.value) : setNewContent(e.target.value)}
                            required
                            rows="5"
                            className="w-full p-3 mb-4 border rounded-lg"
                        ></textarea>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                            >
                                {editingBlog ? 'Update Blog' : 'Add Blog'}
                            </button>
                            {editingBlog && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">{blog.newTitle}</h3>
                        <p className="text-gray-500 text-sm mb-4">{blog.date}</p>
                        <p className="text-gray-700 mb-4">{blog.newContent}</p>
                        
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => handleLikeBlog(blog._id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Like
                            </button>
                            <span className="text-gray-600">{blog.likes || 0} Likes</span>
                        </div>

                        {isAdmin && user && (
                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <button
                                    onClick={() => handleEditBlog(blog)}
                                    className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteBlog(blog._id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {blogs.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No blogs yet. Be the first to add one!</p>
            )}
        </div>
    );
}

export default Blogs;