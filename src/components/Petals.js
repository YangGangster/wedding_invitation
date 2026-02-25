import { useEffect } from 'react';
import '../style/Petal.css'; // fall 애니메이션 CSS 따로 분리

const emojis = ['🌸', '🌺', '🌼', '🌷','🍀'];

export default function Petals() {
  useEffect(() => {
    const container = document.getElementById('petal-container');

    for (let i = 0; i < 40; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${4 + Math.random() * 6}s`;
      petal.style.animationDelay = `${Math.random() * 12}s`;
      petal.style.fontSize = `${0.8 + Math.random() * 0.6}rem`;
      container.appendChild(petal);
    }

    return () => { container.innerHTML = ''; }; // cleanup
  }, []);

  return <div id="petal-container" />;
}