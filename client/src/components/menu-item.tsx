import { NavLink } from "react-router-dom";

interface MenuItemInterface {
    to: string,
    title: string,

    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const MenuItem = (props: MenuItemInterface): JSX.Element => {
    return (
        <li className="menu-item flex-row flex-center">
            <NavLink to={props.to} className="flex flex-center">
                <div className="menu-title-part-container" onClick={ props.onClick }>
                  <h1 className='flex'> { props.title } </h1>
                </div>
            </NavLink>
        </li>
    ); 
}

export default MenuItem;