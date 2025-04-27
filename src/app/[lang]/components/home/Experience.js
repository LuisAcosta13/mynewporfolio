"use client";

import React from 'react';
import SkillMap from './3d_model/SkillMap';
import "@/app/[lang]/styles/experience.scss";

export default function Experience({ experience, skills }) {
  return (
    <div className="experience">
      <div className="experience_title">
        <span className="subtitle">{experience.subtitle}</span>
        <span className="title">{experience.title}</span>
      </div>
      <div className="experience-content">
        <section className='tools'>
          <SkillMap skills={skills} />
        </section>

        <section className="jobs-section">
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
      </div>
    </div>
  )
}