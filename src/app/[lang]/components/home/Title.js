'use client'

import LittleRobotCanvas from "./3d_model/LittleRobotCanvas"
import { useEffect, useState, useRef } from "react";

export default function Title({ dictionary, speed = 60 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [shouldDisplayButtons, setShouldDisplayButtons] = useState(false);
  const indexRef = useRef(0);
  const textRef = useRef(""); // este acumula el texto real
  const responseRef = useRef(null);

  const writeText = (text) => {
    setShouldDisplayButtons(false);
    indexRef.current = 0;
    textRef.current = "";
    setDisplayedText("");

    const interval = setInterval(() => {
      const nextChar = text.charAt(indexRef.current);
      textRef.current += nextChar; // acumulamos
      setDisplayedText(textRef.current); // actualizamos desde ref
      indexRef.current += 1;

      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setShouldDisplayButtons(true); // muestra los botones después de que se haya mostrado el texto

        setTimeout(() => {
          if (responseRef.current?.link) {
            window.open(responseRef.current.link, "_blank");
            responseRef.current = null; // Limpia después de usar
          }
        }, 1000)
      }
    }, speed);
  }

  useEffect(() => {
    writeText(dictionary.greetings);
  }, []);

  const handleResponse = (response) => {
    responseRef.current = response;
    writeText(response.answer);
  }

  return (
    <div className="title-content">
      <LittleRobotCanvas />
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
            <button key={index} onClick={() => handleResponse(q)}>
              {q.question}
            </button>
          )
          }
        </div>}
      </div>
    </div>
  )
}