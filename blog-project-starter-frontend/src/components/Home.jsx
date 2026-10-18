import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to My Blog</h1>
                    <p>Exploring the world of web development, one post at a time.</p>
                    <Link to="/blogs" className="cta-button">
                        View Blogs
                    </Link>
                </div>
                <div className="hero-image">
                    <img src={blogImage} alt="Blog illustration" />
                </div>
            </div>

            {/* Skills Section */}
            <div className="skills-section">
                <h2>Technologies I Use</h2>
                <div className="skills-grid">
                    <div className="skill-card">
                        <img src={html} alt="HTML5" />
                        <span>HTML5</span>
                    </div>
                    <div className="skill-card">
                        <img src={css} alt="CSS3" />
                        <span>CSS3</span>
                    </div>
                    <div className="skill-card">
                        <img src={js} alt="JavaScript" />
                        <span>JavaScript</span>
                    </div>
                    <div className="skill-card">
                        <img src={react} alt="React" />
                        <span>React</span>
                    </div>
                    <div className="skill-card">
                        <img src={node} alt="Node.js" />
                        <span>Node.js</span>
                    </div>
                    <div className="skill-card">
                        <img src={mongo} alt="MongoDB" />
                        <span>MongoDB</span>
                    </div>
                    <div className="skill-card">
                        <img src={firebase} alt="Firebase" />
                        <span>Firebase</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;