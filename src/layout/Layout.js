import React, { useContext, useEffect, useState } from 'react';
import SimpleBackdrop from '../components/Backdrop/Backdrop';
import ImagenSeccion from '../components/ImagenSeccion/ImagenSeccion';
import Navbar from '../components/Navbar/Navbar';
import { DataServicesContext } from "../context/servicesContext/servicesContext"


const Layout = ({children}) => {
    
    const{ login}= useContext(DataServicesContext);

    useEffect(() => {
        login()
    }, [])

    return (
        <>
            
            <SimpleBackdrop />
            <Navbar />
            {children}
        </>
    );
};

export default Layout;