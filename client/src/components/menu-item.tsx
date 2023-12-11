import { NavLink, To } from "react-router-dom";

interface MenuItemInterface {
    title: string,
    
    to: To,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const MenuItem = (props: MenuItemInterface): JSX.Element => {
    return (
        <li className="menu-item flex-row flex-center">
            <NavLink to={props.to} className="flex flex-center" onClick={ props.onClick }>
                <div className="menu-title-part-container">
                  <h1 className='flex'> { props.title } </h1>
                </div>
            </NavLink>
        </li>
    ); 
}

export default MenuItem;