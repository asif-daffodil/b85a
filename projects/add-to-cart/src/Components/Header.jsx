import { NavLink } from "react-router";

const Header = () => {
    return (
        <ul className="w-96 mx-auto flex justify-between">
            <li className="py-3">
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>
                    All Products
                </NavLink>
            </li>
            <li className="py-3">
                <NavLink to='/cart' className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>
                    Cart
                </NavLink>
            </li>
        </ul>
    );
};

export default Header;