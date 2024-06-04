import React from 'react'
import './styles/Navbar.css'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


export const Navbar = () => {
    const[menuOpen, setMenuOpen] = useState(false)

    return(
                <nav> 
                    <Link to="/registro" className='titulos'>CONTINENTAL</Link>
                    <div className="menu" onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>                 
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <NavLink to="/reglamento">Reglamento</NavLink>
                        </li>
                        <li>
                            <NavLink to ="/conflictos">Conflictos</NavLink>
                        </li>
                        <li>
                            <NavLink to ="/castigos">Castigos</NavLink>
                        </li>
                    </ul> 
                </nav>
    );
}
