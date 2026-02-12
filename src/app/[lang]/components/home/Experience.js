"use client";

import React, { useEffect, useRef } from 'react';
import SkillMap from './3d_model/SkillMap';
import "@/app/[lang]/styles/experience.scss";

export default function Experience({ experience, skills }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      const cards = containerRef.current.querySelectorAll('.job-card');
      cards.forEach(card => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="experience">
      <div className="experience_title">
        <span className="subtitle">{experience.subtitle}</span>
        <h2 className="title">{experience.title}</h2>
      </div>
      <div className="experience-content">
        <section className='tools'>
          <div className="model-instructions">
            <span>{experience.interactive_instructions}</span>
          </div>
          <SkillMap skills={skills} />
        </section>

        <section className="jobs-section">
          <div className="timeline-line"></div>
          <ul className="jobs-list">
            {Object.values(experience.work_experience.jobs).map((job, index) =>
              <li className="job-card" key={index}>
                <div className="job-dot"></div>
                <div className="job-card-content">
                  <span className="job-date">{job.date}</span>
                  <h3 className="job-position">{job.position}</h3>
                  <span className="job-company">{job.company}</span>
                </div>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}