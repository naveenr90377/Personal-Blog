import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Personal</h1>
                
                <div className="flex items-center space-x-6">
                    <Link to="/home" className="text-gray-700 hover:text-blue-500 transition">
                        Home
                    </Link>
                    <Link to="/blogs" className="text-gray-700 hover:text-blue-500 transition">
                        Blogs
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">
                        About
                    </Link>
                    
                    {user ? (
                        <>
                            <span className="text-gray-600 text-sm">
                                {user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;