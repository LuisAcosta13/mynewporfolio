"use client";

import React from "react";
import { FaCode } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { DiResponsive } from "react-icons/di";
import { RiTeamFill } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import "@/app/[lang]/styles/skills.scss"

export default function Skills({ skills }) {

    const iconMapping = {
        FaCode: FaCode,
        GiNetworkBars: GiNetworkBars,
        DiResponsive: DiResponsive,
        RiTeamFill: RiTeamFill,
        GoGoal: GoGoal
    };

    return (
        <div className="skills">
            <div className="skills_title">
                <span className="subtitle">{skills.subtitle}</span>
                <span className="title">{skills.title}</span>
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