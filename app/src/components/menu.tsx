import logo from '../img/icon.png';
import '../css/menu.css';
import { NavLink } from 'react-router-dom';

export const Menu = (): JSX.Element => {
  return (
    <header className="menu flex-column align-start">
      <div className="menu-title-container flex flex-center">
        <h1 className="menu-title">KWIZ</h1>
      </div>
      <nav className="menu-container flex-column align-start">
        <ul className="menu-list flex-column align-start">
          <li className="menu-item flex-row flex-center">
            <NavLink to={'/'} className="flex flex-center">
              <div className="menu-title-part-container">
                <h1 className='flex'>Jouer !</h1>
              </div>
            </NavLink> 
          </li>
          <li className="menu-item flex-row flex-center">
            <NavLink to={'/new/'} className="flex flex-center">
              <div className="menu-title-part-container">
                <h1 className='flex'>Créer un quiz</h1>
              </div>
            </NavLink>
          </li>
          <li className="menu-item flex-row flex-center">
            <NavLink to={'/historical/'} className="flex flex-center">
              <div className="menu-title-part-container">
                <h1 className='flex'>Historique</h1>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;