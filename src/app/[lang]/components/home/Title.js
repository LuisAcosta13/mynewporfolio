'use client'

import LittleRobotCanvas from "./3d_model/LittleRobotCanvas"
import { useEffect, useState, useRef } from "react";

export default function Title({ dictionary, speed = 60, lang }) {
  const [displayedText, setDisplayedText] = useState("");
  const [shouldDisplayButtons, setShouldDisplayButtons] = useState(false);
  const [isThinking, setIsThinking] = useState(false); // Estado para controlar el texto que se está escribiendo
  const indexRef = useRef(0);
  const textRef = useRef(""); // este acumula el texto real
  const responseRef = useRef(null);
  const [questions, setQuestions] = useState([
    ...dictionary.responses,
    {
      question: lang === "es" ? "¿Qué proyectos has realizado?" : "What projects have you built?",
      answer: lang === "es" ? "¡He trabajado en varios proyectos emocionantes! He añadido una sección de Proyectos justo debajo para que puedas explorarlos. 🚀" : "I've worked on several exciting projects! I've added a Projects section just below for you to explore. 🚀",
      scrollTo: "projects"
    }
  ]);

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
        setIsThinking(false);

        setTimeout(() => {
          if (responseRef.current?.link) {
            window.open(responseRef.current.link, "_blank");
          }

          if (responseRef.current?.scrollTo) {
            const element = document.querySelector(`.${responseRef.current.scrollTo}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }

          responseRef.current = null; // Limpia después de usar
        }, 1000)
      }
    }, speed);
  }

  useEffect(() => {
    writeText(dictionary.greetings);
  }, []);

  const changeQuestions = (response) => {
    let questionsArray = response;

    // Add go back button
    questionsArray.push(dictionary.goBackResponse);
    setQuestions(questionsArray);
  }

  const handleResponse = (response) => {
    setIsThinking(true)
    responseRef.current = response;
    writeText(response.answer);

    response.goBackButton && setQuestions(dictionary.responses);
    response.otherQuestions && changeQuestions(response.otherQuestions);
  }

  return (
    <div className="title-content">
      <LittleRobotCanvas isThinking={isThinking} />
      <div className="chatbot-ui">
        <div className="title-text">
          <div className="title-name">
            {displayedText}
            <span className="cursor"> </span>
          </div>
          {/* <span className="title-rol">{dictionary.rol}</span> */}
        </div>
        {shouldDisplayButtons && <div className="chatbot-options">
          {questions && questions.map((q, index) =>
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