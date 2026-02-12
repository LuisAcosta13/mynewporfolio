"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "@/app/[lang]/styles/projects.scss";

export default function Projects({ projects }) {
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
            const cards = containerRef.current.querySelectorAll('.project_card');
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="projects">
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
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="project_img"
                                />
                            ) : (
                                <div className="image_placeholder">
                                    <span>{project.title}</span>
                                </div>
                            )}
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
