import React,{useState} from "react"
import "../ImagenSeccion/image.css"
import styled from "styled-components"
import {Link} from "react-scroll"
import Carousel from 'react-elastic-carousel'
import { useParams } from 'react-router';
import {  Grid } from "@mui/material"
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


const   ImagenSeccionHogar = () => {
    const[value, setValue]=useState();
    const { itemIndex } = useParams();

    const handleChange = (e) =>{
        setValue(e.target.value)
    }
    return  (
        <>
     
         <div class="containerDesktop" style={(itemIndex==="2"||"3")?{marginBottom:"100px"}:{marginBottom:"auto"}}>
        
         <Carousel itemsToShow={1} pagination={false} showArrows={false} enableSwipe={false}>
 
         
        {itemIndex==="1"?  
             <Grid container spacing={2} className="container-grid-carousel">
             
             <Grid item xs={12} sm={6} md={6} lg={6}>
                
         <Img  
            src="/asegurapro/cotizador/assets/image/iconolandingpage-Hogar-02.svg" 
            class="img-fluid" 
            lazy cache   
            alt="..." 
            />
             </Grid>
 
             <Grid item xs={12} sm={6} md={6} lg={6}>
                 <item>
                 <h1>  En diciembre y durante todo el año asegura tu hogar con AseguraPro </h1>
                 <h2>Contrata un seguro que te responda frente a un robo, un incendio, desastres naturales y todo tipo de amenazas.</h2>
                <item><Link to="hogar" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
                 <Img 
                    onClick={handleChange} 
                    src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" 
                    class="img-button"   
                    alt="..." 
                    lazy
                    cache
                    /></Link></item>
                 </item> 
             </Grid>
            
             </Grid>
        :null}

        {itemIndex==="2"? 
             <Grid container spacing={2} className="container-grid-carousel">
             
             <Grid item xs={12}  sm={6} md={6} lg={6}>
                 <Img  src="/asegurapro/cotizador/assets/image/iconolandingpage-Hogar-04.svg" style={{marginTop:"40px"}} lazy cache class="img-fluid"   alt="..." /> 
             </Grid>
 
             <Grid item xs={12}  sm={6} md={6} lg={6}>
                 <item>
                 <h1> Sí, hasta los más tontos accidentes pueden terminar en tragedia cuando no tienes tu hogar asegurado </h1>
                 <h2>Una olla que se quedó encendida, una vela que olvidaste apagar, un cortocircuito provocado por las luces del árbol de navidad, un cohete (juego pirotécnico) que entra por la ventana de tu hogar o, incluso, un ladrón que irrumpió 
                     de madrugada para robar tus pertenencias. No queremos ser fatalistas, simplemente estas cosas pasan.  </h2>
                     <h2>¿Vas a viajar en diciembre y dejarás tu casa sola por varios días? En AseguraPro sabemos muy bien cuánto te has esforzado por construir tu hogar y el de tu familia. Por ello,
                          lo mejor que puedes hacer es anticiparte a cualquier eventualidad y contratar un seguro.  </h2>
         
  <item><Link to="hogar" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
         <Img 
            onClick={handleChange} 
            src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" 
            class="img-button"   
            alt="..." 
            lazy
            cache
            /></Link></item>
                 </item> 
             </Grid>
            
             </Grid>
        :null}

        {itemIndex==="3"?
             <Grid container spacing={2} className="container-grid-carousel">
             
             <Grid item xs={12}  sm={6} md={6} lg={6}>
                 
         <Img  src="/asegurapro/cotizador/assets/image/iconolandingpage-Hogar-06.svg" style={{marginTop:"70px"}} class="img-fluid"  lazy cache   alt="..." /> 
             </Grid>
 
             <Grid item xs={12}  sm={6} md={6} lg={6}>
                 <item>
                 <h1>  Desde el primer momento que contratas un seguro para tu hogar, inmediatamente cuentas con: </h1>
                 <ul>
                    <li>Una suma asegurada con la que podrás contar para reponer tus pertenencias y reparar daños en tu inmueble luego de un accidente o robo. 
                    </li>
                    <li>Un nuevo aliado: tu asesor de seguros, quien te asistirá al momento de una emergencia y responderá a todas tus preguntas cuando lo necesites.  
                    </li>
                    <li>La posibilidad de irte a la cama mucho más tranquilo porque tu hogar está protegido .
                    </li>
                    
                </ul>
  <item><Link to="hogar" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
         <Img 
            onClick={handleChange} 
            src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" 
            class="img-button"   
            alt="..." 
            lazy
            cache
            /></Link></item>
                 </item> 
             </Grid>
            
             </Grid>
        :null}
             
      
        
 </Carousel>
        
        
  
 
 </div> 
 
 
 
 </>
     )
 }
export default ImagenSeccionHogar;