"use client";

import React, { useEffect, useRef } from "react";
import { FaCode } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { RiTeamFill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import "@/app/[lang]/styles/skills.scss"

export default function Skills({ skills }) {
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
            const cards = containerRef.current.querySelectorAll('.skill_card');
            cards.forEach(card => observer.observe(card));
        }

        return () => observer.disconnect();
    }, []);

    const iconMapping = {
        FaCode: FaCode,
        GiNetworkBars: GiNetworkBars,
        DiResponsive: DiResponsive,
        RiTeamFill: RiTeamFill,
        GoGoal: GoGoal
    };

    return (
        <div ref={containerRef} className="skills">
            <div className="skills_title">
                <span className="subtitle">{skills.subtitle}</span>
                <h2 className="title">{skills.title}</h2>
            </div>
            <ul className="skills_list">
                {Object.values(skills.list).map((skill, index) =>
                    skill && <li className="skill_card" key={index}>
                        <div className="header">
                            {React.createElement(iconMapping[skill.icon], { size: 40 })}
                            <span className="card_title">{skill.title}</span>
                        </div>

                        <p className="card_text">{skill.text}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}