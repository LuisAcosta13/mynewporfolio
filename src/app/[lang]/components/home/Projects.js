"use client";

import React from "react";
import Image from "next/image";
import "@/app/[lang]/styles/projects.scss";

export default function Projects({ projects }) {
    return (
        <div className="projects">
            <div className="projects_title">
                <span className="subtitle">{projects.subtitle}</span>
                <span className="title">{projects.title}</span>
            </div>
            <div className="projects_grid">
                {projects.list.map((project, index) => (
                    <a 
                        key={index} 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project_card"
                    >
                        <div className="project_image">
                            {/* Using a placeholder style if images don't exist yet */}
                            <div className="image_placeholder">
                                <span>{project.title}</span>
                            </div>
                        </div>
                        <div className="project_info">
                            <h3 className="project_name">{project.title}</h3>
                            <p className="project_description">{project.description}</p>
                            <div className="project_tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
