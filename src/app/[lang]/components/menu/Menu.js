"use client";

import LocaleSwicher from "./localeSwitcher/localeSwitcher";
import "../../styles/menu.scss"
import DarkModeBttn from "./darkModeBttn/DarkModeBttn";
import { useEffect, useRef } from "react";

export default function Menu({ lang, dictionary }) {
  const menuRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;
    const menu = menuRef.current;
    const showThreshold = 80;

    function handleMouseMove(e) {
      if (e.clientY <= showThreshold) {
        // Mostrar el menú si el mouse está en la parte superior
        menu.style.transform = 'translateY(0)';
      } else {
        menu.style.transform = 'translateY(-100%)';
      }
    }

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        menu.style.transform = 'translateY(0)';
        window.removeEventListener('mousemove', handleMouseMove);
      } else if (scrollTop > lastScrollTop) {
        menu.style.transform = 'translateY(-100%)';
        window.addEventListener('mousemove', handleMouseMove);
      } else {
        menu.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [])

  return (
    <div id="menu" ref={menuRef} className="menu">
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