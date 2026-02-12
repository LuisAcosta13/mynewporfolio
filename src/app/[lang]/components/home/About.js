"use client";
import { useEffect, useRef } from "react"
import profilePicture from "../../../../../public/images/profile.jpeg"
import Image from "next/image"

export default function About({ dictionary }) {

    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        textRef.current.innerHTML = dictionary.about

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [dictionary.about])

    return (
        <div ref={containerRef} className="about-content">
            <div className="image-container">
                <Image
                    src={profilePicture}
                    alt="profile picture"
                    width={500}
                    height={500}
                    priority
                />
            </div>
            <div className="text-container">
                <h2 className="about-title">{dictionary.about_title}</h2>
                <div ref={textRef} className="about-text"></div>
            </div>
        </div>
    )
}