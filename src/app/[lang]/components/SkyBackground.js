'use client'

import React, { useEffect } from 'react';
import '../styles/config.scss';

export default function SkyBackground() {
    const generateStars = () => {
        const sky = document.querySelector('.sky');

        if (sky) {
            for (let i = 0; i < 150; i++) { // 150 estrellas
                const star = document.createElement('div');
                star.classList.add('star');

                // Posición aleatoria
                star.style.top = Math.random() * 100 + 'vh';
                star.style.left = Math.random() * 100 + 'vw';

                // Tamaño aleatorio
                const size = Math.random() * 2 + 1; // entre 1px y 3px
                star.style.width = size + 'px';
                star.style.height = size + 'px';

                // Animación aleatoria: duración y delay diferentes para cada estrella
                const duration = Math.random() * 3 + 2; // entre 2s y 5s
                const delay = Math.random() * 5 + 's'; // Entre 0s y 5s de retraso
                star.style.animationDuration = `${duration}s`;
                star.style.animationDelay = delay;

                // Añadimos la estrella al contenedor
                sky.appendChild(star);
            }
        }
    };

    useEffect(() => {
        generateStars();
    }, []);

    return (
        <div className="sky">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            <div className="cloud cloud5"></div>
            <div className="cloud cloud6"></div>
            <div className="cloud cloud7"></div>
        </div>
    )
}