import React from 'react';
import { Link } from 'react-router-dom';
import './common/Navbar.css';

// Import images
import blogImage from '../assets/blogImage.png';
import html from '../assets/html.png';
import css from '../assets/css-3.png';
import js from '../assets/js.png';
import react from '../assets/p1.jpg';
import node from '../assets/node-js.png';
import mongo from '../assets/p2.png';
import firebase from '../assets/p3.png';

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                            Welcome to My{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                                Blog
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Exploring the world of web development, one post at a time. 
                            Join me on this journey of learning, building, and sharing knowledge.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link 
                                to="/blogs" 
                                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                            >
                                📚 Explore Blogs
                            </Link>
                            <Link 
                                to="/about" 
                                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-orange-300 transform hover:-translate-y-1 transition duration-300"
                            >
                                👤 About Me
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right Image */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <img 
                                src={blogImage} 
                                alt="Blog illustration" 
                                className="relative w-full max-w-lg rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16 mt-8">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        What You'll Find Here
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Tutorial Posts</h3>
                            <p className="text-gray-600">Step-by-step guides and tutorials on web development technologies.</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                            <div className="text-5xl mb-4">💡</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Tips & Tricks</h3>
                            <p className="text-gray-600">Quick tips and best practices to improve your coding skills.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Project Showcases</h3>
                            <p className="text-gray-600">Real-world projects and their implementation details.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technologies Section */}
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Technologies I Use
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Building modern web applications with these powerful tools
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={html} alt="HTML5" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">HTML5</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={css} alt="CSS3" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">CSS3</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={js} alt="JavaScript" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">JavaScript</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={react} alt="React" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">React</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={node} alt="Node.js" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">Node.js</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={mongo} alt="MongoDB" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">MongoDB</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 text-center">
                        <img src={firebase} alt="Firebase" className="w-16 h-16 mx-auto mb-3" />
                        <span className="text-sm font-semibold text-gray-700">Firebase</span>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 py-16 mt-8">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                        Dive into my blog and discover tutorials, tips, and insights that will help you become a better developer.
                    </p>
                    <Link 
                        to="/blogs" 
                        className="inline-block px-10 py-4 bg-white text-orange-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                    >
                        Browse All Blogs →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;