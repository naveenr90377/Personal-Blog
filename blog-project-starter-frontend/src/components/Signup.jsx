import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            // Create user in Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully');
            navigate('/home');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg" style={{ width: "70%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign Up</h2>
                
                {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
                
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}>
                    Already have an account? Login here
                </p>
                <button 
                    type="submit" 
                    className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default Signup;