import Paragraph from './Paragraph';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

export default function Content() {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <div className={`content ${theme}`}>
      <button onClick={() => toggleTheme()}>Toggle theme</button>
      <Paragraph />
    </div>
  );
}
