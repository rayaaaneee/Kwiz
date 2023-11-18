import '../css/menu.scss';
import { NavLink } from 'react-router-dom';

import MenuItem from './menu-item';

export const Menu = (): JSX.Element => {
  return (
    <header className="menu flex-column align-start">
      <div className="menu-title-container flex flex-center">
        <h1 className="menu-title">KWIZ</h1>
      </div>
      <nav className="menu-container flex-column align-start">
        <ul className="menu-list flex-column align-start">
          <MenuItem to={ '/' } title={ 'Jouer !' } />
          <MenuItem to={ '/new' } title={ 'Créer un quiz' } />
          <MenuItem to={ '/historical' } title={ 'Historique' } />
          <MenuItem to={ '/myquizzes' } title={ 'Mes quiz' } />
        </ul>
      </nav>
    </header>
  );
}

export default Menu;