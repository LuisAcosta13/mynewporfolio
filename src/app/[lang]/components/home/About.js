"use client";
import { useEffect, useRef } from "react"
import profilePicture from "../../../../../public/images/profile.jpeg"
import Image from "next/image"

export default function About({dictionary}){

    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.innerHTML = dictionary.about
    },[])

    return(
        <div className="about-content">
            <div className="image-container">
                <Image 
                src={profilePicture}
                alt="profile picture"
                width={600}
                height={600}
                />
            </div>
            <div>
                <h2 className="about-title">{dictionary.about_title}</h2>
                <div ref={textRef} className="about-text"></div>
            </div>         
        </div>
    )
}