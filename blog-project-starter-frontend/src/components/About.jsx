import React from 'react';
import './common/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Me</h1>
        <p>Full Stack Web Developer</p>
      </div>
      <div className="about-content">
        <div className="about-profile">
          <div className="profile-info">
            <h2>Naveen R</h2>
            <p className="description">
              I am a passionate web developer with expertise in creating stunning, 
              responsive websites and web applications using React, Node.js, 
              MongoDB, and Firebase.
            </p>
          </div>
        </div>
        <div className="skills-section">
          <h2>My Skills</h2>
          <div className="skills-grid">
            <div className="skill-item"><span></span><span>HTML5</span></div>
            <div className="skill-item"><span>🎨</span><span>CSS3</span></div>
            <div className="skill-item"><span>⚡</span><span>JavaScript</span></div>
            <div className="skill-item"><span>⚛️</span><span>React</span></div>
            <div className="skill-item"><span></span><span>Node.js</span></div>
            <div className="skill-item"><span>🍃</span><span>MongoDB</span></div>
            <div className="skill-item"><span>🔥</span><span>Firebase</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;