import { useEffect } from "react";

export default function ParticleSystem() {
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;

      particlesContainer.innerHTML = '';

      const particleCount = 15;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = Math.random() * 16 + 2 + 'px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    let particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles';
      document.body.appendChild(particlesContainer);
    }

    createParticles();

    return () => {
      const container = document.querySelector('.particles');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return null;
}