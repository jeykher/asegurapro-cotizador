import React,{useState} from "react"
import { useParams } from 'react-router';
import "../ImagenSeccion/image.css"
import styled from "styled-components"
import {Link} from "react-scroll"
import Carousel from 'react-elastic-carousel'
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


 const   ImagenSeccionAuto = () => {
    const[value, setValue]=useState();
    const { itemIndex } = useParams();
    const handleChange = (e) =>{
        setValue(e.target.value)
    }



    
    return (
       <>
    
        <div class="containerDesktop" style={(itemIndex==="2"||"3")?{marginBottom:"100px"}:{marginBottom:"auto"}}>
       
        <Carousel itemsToShow={1} pagination={false} showArrows={false} enableSwipe={false}>

        
            {itemIndex==="1"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12} sm={6} md={6} lg={6}>
            <Image  src="/asegurapro/cotizador/assets/image/iconolandingpage-Automóvil-01.svg" class="img-fluid"   alt="..." />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <item>
                    <h1> Rueda tranquilo en diciembre ¡nosotros nos encargamos de cuidar tu carro!  </h1>
                    <h2> Contrata un seguro para automóviles con AseguraPro y Seguros Pirámide. Contamos con planes que se ajustan a tu medida y te garantizamos respuesta frente a cualquier emergencia, incluyendo robo y pérdida total.  </h2>
    <item><Link to="auto" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
            <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button"   alt="..." /></Link></item>
                    </item> 
                </Grid>
            
                </Grid>
            :null}

            {itemIndex==="2"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12}  sm={6} md={6} lg={6}>
            <Image src="/asegurapro/cotizador/assets/image/iconolandingpage-Automóvil-03.svg" class="img-fluid"   alt="..." />
                </Grid>

                <Grid item xs={12}  sm={6} md={6} lg={6}>
                    <item>
                    <h1>Si en diciembre vas a viajar en tu carro, es importante que cuentes con un seguro que te brinde respaldo kilómetro a kilómetro.</h1>
                    <h2> Imagina que decides tomar tu vehículo y viajar varios kilómetros
                        para encontrarte con ese familiar o amigo al que tienes meses sin ver y,
                        de la nada, te quedaste accidentado, sufriste un pequeño accidente o,
                        peor: ¡te robaron el carro! No puedes evitar que estas cosas pasen,
                        pero sí puedes estar prevenido al comprar un seguro para tu automóvil
                        que te dé respuestas al momento y proteja tu inversión al respaldar tu
                        vehículo, incluso, frente a siniestros parciales y pérdida total.<br/> <br/>
                        Compra un seguro para automóviles con AseguraPro y Seguros
                        Pirámide.     
                    </h2>
            
        <item><Link to="auto" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
            <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button" lazy cache   alt="..." /></Link></item>
                    </item> 
                </Grid>
            
                </Grid>
            :null}

            {itemIndex==="3"?
                <Grid container spacing={2} className="container-grid-carousel">
                
                <Grid item xs={12}  sm={6} md={6} lg={6}>
            <Img  src="/asegurapro/cotizador/assets/image/iconolandingpage-Automóvil-05.svg" class="img-fluid" lazy cache   alt="..." />
                </Grid>

                <Grid item xs={12}  sm={6} md={6} lg={6} className="text-container-landing">
                    <item>
                    <h1>Estos son los beneficios que obtienes cuando contratas un seguro de RCV con grúa mediante AseguraPro y Seguros Pirámide:  </h1>
                    <ul>
                        <li>Comprando nuestra Póliza de RCV con grúa cumples con un requisito obligatorio para circular en cualquier parte de Venezuela. 
                        </li>
                        <li>Cuentas con asistencia vial en cualquier parte del país. 
                        </li>
                        <li>Puedes usar el servicio de grúa cuantas veces lo necesites. 
                        </li>
                        
                    </ul>
                    <br/>
                    <h2>Compra un seguro para automóviles con AseguraPro y Seguros Pirámide.</h2>
    <item><Link to="auto" smooth={true} spy={true} offset={-70} exact={true} duration={1} activeClass="active">
            <Img onClick={handleChange} src="/asegurapro/cotizador/assets/image/Bot2n-02.jpg" class="img-button"  lazy cache  alt="..." /></Link></item>
                    </item> 
                </Grid>
            
                </Grid>
            :null}
     
       
</Carousel>
       
       
 

</div> 



</>
    )
}
export default ImagenSeccionAuto;