import react from 'react';
import './Navbar.css';

import PiramideBrand from '../PiramideBrand/PiramideBrand';
import AseguraProBrand from '../AseguraProBrand/AseguraProBrand';

const Navbar = () => {
    return (
        <>
            <nav className="cap-navbar">
                <div 
                    className="cap-navbar-brands-container cap-navbar-piramide-container"
                >                    
                    <PiramideBrand 
                        width="140"
                        height="7vh"
                    />
                </div>
                <div className="cap-navbar-brands-container cap-navbar-asegurapro-container">                    
                    <AseguraProBrand 
                        width="140"
                        height="7vh"
                    />
                </div>
            </nav>
        </>
    );
};

export default Navbar;