"use client";

import React, { useState, useEffect, useRef } from 'react';
import "@/app/[lang]/styles/experience.scss";

const ProgressBar = ({ percentage }) => {
  const progressBarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Dejar de observar una vez que se ha visto
          }
        });
      },
      { threshold: 0.5 } // Cuando el 50% de la barra está en pantalla
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  return (
    <div ref={progressBarRef} className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          width: isVisible ? `${percentage}%` : '0%',
          transition: 'width 1s ease-out',
        }}
      />
    </div>
  );
};

export default function Experience({ experience }) {
    return (
        <div className="experience">
            <div className="experience_title">
                <span className="subtitle">{experience.subtitle}</span>
                <span className="title">{experience.title}</span>
            </div>
            <div className="experience-content">
                <section className="jobs-section">
                    <span className="jobs-label">{experience.work_experience.title}</span>
                    <ul className="jobs-list">
                        {Object.values(experience.work_experience.jobs).map((job, index) =>
                            <li className="job-card" key={index}>
                                <span className="text-one">{job.date}</span>
                                <span className="text-two">{job.position}</span>
                                <span className="text-three">{job.company}</span>
                            </li>
                        )}
                    </ul>
                </section>
                <section className='tools'>
                    <span className='tools-label'>{experience.skills.title}</span>
                    <ul className="progress-bar-list">
                        {experience.skills.tools.map((skill, index) => (
                            <li key={index} className="progress-bar-item">
                                <h3>{skill.name}</h3>
                                <ProgressBar percentage={skill.level} />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}