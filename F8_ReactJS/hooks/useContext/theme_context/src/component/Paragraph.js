import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Paragraph() {
  const { theme } = useContext(ThemeContext);
  return (
    <p className={theme}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti ea quo
      vitae non magni libero animi, quibusdam, necessitatibus, eaque porro sed.
      Quisquam quas repellat assumenda repellendus laborum impedit. Sapiente
      exercitationem laborum repudiandae quasi, officia necessitatibus similique
      sit porro natus aspernatur non reprehenderit ipsa tempore incidunt
      doloribus unde neque nemo nobis? Similique dolorem placeat facere laborum
      quo tempore autem debitis! Enim dolor expedita vel, vero dolorum sequi
      nisi, provident laudantium, rem pariatur nostrum sapiente praesentium
      mollitia?
    </p>
  );
}
