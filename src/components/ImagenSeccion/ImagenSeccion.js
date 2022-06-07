import React,{useState} from "react"
import "../ImagenSeccion/image.css"
import styled from "styled-components"
import {Link} from "react-scroll"
import Carousel from 'react-elastic-carousel'
import {  Grid } from "@mui/material"
import { useParams } from 'react-router';

import Img from "react-cool-img";

const Image = styled.img`
height: auto;
width:100%;
object-fit:contain;


@media (min-width: 768px) {
    height:100vh;
}
@media (max-width: 767px) {
   margin-top:100px
}
`; 

const   ImagenSeccion = () => {
    const[value, setValue]=useState();
    const { itemIndex } = useParams();

    const handleChange = (e) =>{
        setValue(e.target.value)
    }
    return (
        <>
     
         <div class="containerDesktop">
        
         <Carousel itemsToShow={1} pagination={false} showArrows={false} enableSwipe={false}>
 
         
 
            {itemIndex==="1"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    
            <Image  src="/asegurapro/cotizador/assets/image/viajerofinal1.svg" class="img-fluid" lazy cache  alt="..." />
                </Grid>
    
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <item>
                    <h1>  Si en navidades vas a viajar fuera del país </h1>
                    <h2>Contrata un seguro en minutos y enfócate en recargar energías mientras nosotros te mantenemos seguro </h2>
                    <item><Link to="viajero" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
                    <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button"   alt="..." /></Link></item>
                    </item> 
                </Grid>
                
                </Grid>
            :null}

            {itemIndex==="2"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12}  sm={6} md={6} lg={6}>
                    <Image  src="/asegurapro/cotizador/assets/image/viajerofinal2.svg" class="img-fluid" lazy cache  alt="..." /> 
                </Grid>
    
                <Grid item xs={12}  sm={6} md={6} lg={6}>
                    <item>
                    <h1>Con la llegada del COVID-19, contratar un seguro de viajes es obligatorio.</h1>
                    <h2>Prepárate de verdad para disfrutar de un merecido viaje de descanso y placer cuidando lo más importante: ¡tu salud!                
                    </h2>
            
    <item><Link to="viajero" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
            <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button"   alt="..." /></Link></item>
                    </item> 
                </Grid>
                
                </Grid>
            :null}

            {itemIndex==="3"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12}  sm={6} md={6} lg={6}>
                    
            <Image  src="/asegurapro/cotizador/assets/image/viajerofinal3.svg"  class="img-fluid" lazy cache   alt="..." /> 
                </Grid>
    
                <Grid item xs={12}  sm={6} md={6} lg={6}>
                    <item>
                    <h1>¿Piensas que contratar un seguro de viajes es demasiado costoso? </h1>
                    <ul>
                        <li> Contratar un seguro que te brinde respaldo y atención internacional sin importar dónde estés te cuesta menos de $3,25 el día. 
                        </li>
                        <li>Por sólo $3,25 estás asegurado y tranquilo porque contarás con atención frente a una emergencia.  
                        </li>
                        
                    </ul>
    <item><Link to="viajero" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
            <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button" lazy cache   alt="..." /></Link></item>
                    </item> 
                </Grid>
                
                </Grid>
            :null}
             
      
        
 </Carousel>
        
        
  
 
 </div> 
 
 
 
 </>
     )
 }
export default ImagenSeccion;