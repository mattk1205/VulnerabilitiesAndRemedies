import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 40) {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    setDisplayText(' ');
    let i = -1;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        console.log(text.charAt(i));
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
}