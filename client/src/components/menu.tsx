import { useContext } from 'react';

import { ChildrenInterface } from '../interface/children-interface';
import { CookieInterface } from '../interface/cookie-interface';

import cookieContext from '../context/cookie-context';

import MenuItem from './menu-item';

import '../asset/css/menu.scss';

const Menu = (props: ChildrenInterface): JSX.Element => {

  const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');

  return (
    <>
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
            <MenuItem to={ '/profile' } title={ 'Mon profil' } />
            <MenuItem to={ '/friends' } title={ 'Mes amis' } />
            <MenuItem to={ '/login' } onClick={ HandleUserIdCookie.delete } title={ 'Me déconnecter' } />
          </ul>
        </nav>
      </header>
      <main>
          <div className="page-container flex flex-center">
              <div className="content-page flex-column flex-center">
                  { props.children }
              </div>
          </div>
      </main>
    </>
  );
}

export default Menu;