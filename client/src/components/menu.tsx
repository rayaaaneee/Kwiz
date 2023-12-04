import { useContext } from 'react';

import { ChildrenInterface } from '../interface/children-interface';
import { CookieInterface } from '../interface/cookie-interface';

import MenuItem from './menu-item';

import cookieContext from '../context/cookie-context';
import toastContext from '../context/toast-context';
import { ToastContextManager } from '../object/toast-context-manager';


import '../asset/css/menu.scss';
import { ToastType } from './toast';

const Menu = (props: ChildrenInterface): JSX.Element => {

  const HandleUserIdCookie: CookieInterface = useContext(cookieContext).get('user_id');
  const HandleToasts: ToastContextManager = useContext(toastContext);

  const HandleLogout = () => {
    HandleUserIdCookie.delete();
    HandleToasts.push({
      message: 'You have been disconnected',
      type: ToastType.info
    })
  }

  return (
    <>
      <header className="menu flex-column align-start">
        <div className="menu-title-container flex flex-center">
          <h1 className="menu-title">KWIZ</h1>
        </div>
        <nav className="menu-container flex-column align-start">
          <ul className="menu-list flex-column align-start">
            <MenuItem to={ '/profile' } title={ 'Profile' } />
            <MenuItem to={ '/friends' } title={ 'Friends' } />
            <MenuItem to={ '/' } title={ 'Play !' } />
            <MenuItem to={ '/new' } title={ 'Create a quiz' } />
            <MenuItem to={ '/my-quizzes' } title={ 'My quizzes' } />
            <MenuItem to={ '/historical' } title={ 'Historical' } />
            <MenuItem to={ '/login' } onClick={ HandleLogout } title={ 'Disconnect' } />
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