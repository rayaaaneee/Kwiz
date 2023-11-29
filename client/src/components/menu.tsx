import MenuItem from './menu-item';

import useCookie from '../hook/use-cookie';

import '../asset/css/menu.scss';

interface MenuInterface {
  children: JSX.Element
}

const Menu = (props: MenuInterface): JSX.Element => {

  const [userId, setUserId, deleteUserId] = useCookie('user_id');

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
            <MenuItem to={ '/myquizzes' } title={ 'Mes quiz' } />
            <MenuItem to={ '/login' } onClick={ (e) => { deleteUserId() } } title={ 'Me déconnecter' } />
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