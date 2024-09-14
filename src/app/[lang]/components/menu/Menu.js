"use client";

import LocaleSwicher from "./localeSwitcher/localeSwitcher";
import "../../styles/menu.scss"
import DarkModeBttn from "./darkModeBttn/DarkModeBttn";
import { useEffect } from "react";

export default function Menu({ lang, dictionary }) {

  useEffect(() => {
    let lastScrollTop = 0;
    const menu = document.getElementById('menu');
    const showThreshold = 80;

    function handleMouseMove(e) {
      if (e.clientY <= showThreshold) {
        // Mostrar el menú si el mouse está en la parte superior
        menu.style.transform = 'translateY(0)';
      } else {
        menu.style.transform = 'translateY(-100%)';
      }
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollTop === 0) {
        // Si estamos en la parte superior de la página, asegurarse de que el menú esté visible
        menu.style.transform = 'translateY(0)';
        window.removeEventListener('mousemove', handleMouseMove);
      } else if (scrollTop > lastScrollTop) {
        // Scroll hacia abajo - ocultar header
        menu.style.transform = 'translateY(-100%)';
        window.addEventListener('mousemove', handleMouseMove);
      } else {
        // Scroll hacia arriba - mostrar header
        menu.style.transform = 'translateY(0)';
      }

      lastScrollTop = scrollTop;
    });
  }, [])

  return (
    <div id="menu" className="menu">
      <div className="padding">
        <section>
          <span className="menu-logo">{dictionary.name}</span>
        </section>
        <section className="buttons">
          <DarkModeBttn />
          <LocaleSwicher lang={lang} />
        </section>

      </div>

    </div>
  );
}