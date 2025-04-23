'use client'

import LittleRobotCanvas from "./3d_model/LittleRobotCanvas"
import { useEffect, useState, useRef } from "react";

export default function Title({ dictionary, speed = 50 }) {

    const [displayedText, setDisplayedText] = useState("");
    const [shouldDisplayButtons, setShouldDisplayButtons] = useState(false);
    const indexRef = useRef(0);
    const textRef = useRef(""); // este acumula el texto real
  
    useEffect(() => {
      indexRef.current = 0;
      textRef.current = "";
      setDisplayedText(""); // reinicia el texto mostrado
  
      const interval = setInterval(() => {
        const nextChar = dictionary.greetings.charAt(indexRef.current);
        textRef.current += nextChar; // acumulamos
        setDisplayedText(textRef.current); // actualizamos desde ref
        indexRef.current += 1;
  
        if (indexRef.current >= dictionary.greetings.length) {
          clearInterval(interval);
          setShouldDisplayButtons(true); // muestra los botones después de que se haya mostrado el texto
        }
      }, speed);

      return () => clearInterval(interval);
    }, [dictionary.greetings, speed]);

    const handleResponse = (response) => {

        indexRef.current = 0;
      textRef.current = "";
      setDisplayedText(""); // reinicia el texto mostrado
  
      const interval = setInterval(() => {
        const nextChar = response.charAt(indexRef.current);
        textRef.current += nextChar; // acumulamos
        setDisplayedText(textRef.current); // actualizamos desde ref
        indexRef.current += 1;
  
        if (indexRef.current >= response.length) {
          clearInterval(interval);
          setShouldDisplayButtons(true); // muestra los botones después de que se haya mostrado el texto
        }
      }, speed);
    }

    return (
        <div className="title-content">
            {/* <LittleRobotCanvas /> */}
            <div className="chatbot-ui">
                <div className="title-text">
                    <div className="title-name">
                        {displayedText}
                        <span className="cursor"> </span>
                    </div>
                    {/* <span className="title-rol">{dictionary.rol}</span> */}
                </div>
                {shouldDisplayButtons && <div className="chatbot-options">
                  {dictionary.responses.map((q, index) => 
                      <button key={index} onClick={() => handleResponse(q.answer)}>
                        {q.question}
                      </button>
                    )
                  }
                </div>}
            </div>
        </div>
    )
}