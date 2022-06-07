import React, { useEffect } from "react";
import { Divider, Grid } from "@mui/material"
import { AppWrapper } from "../tools/AppWrapper"
import { BackgroundImage } from "../tools/ImageBackground"
import { PaperFormViajero } from "../tools/PaperFormViajero"
import { SubTitleForm, TitleForm } from "../tools/TituloForm"
import FormHogar from "./formHogar"
import ImagenSeccionHogar from "../ImagenSeccion/ImagenSeccionHogar"
import Img from "react-cool-img";


const HomePage = () => (
    <AppWrapper>
        <ImagenSeccionHogar/>
        <div className="container-form-background" id="hogar">
        <BackgroundImage>
            <source srcSet="/asegurapro/cotizador/assets/image/fondoHogarResponsive.png" media="(max-width: 500px)"/>
            <Img 
                src="/asegurapro/cotizador/assets/image/fondoHogar.png" 
                alt="MDN"
                lazy
                cache
                />
        </BackgroundImage>
        <Grid
                container
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    height: "90vh",
                    position: "absolute",
                    top: "0"
         }}
        >
            <Grid item sm={6} md={4} xs={12} lg={4} >
                <PaperFormViajero className="container-paper-form">
                    <TitleForm>Cotiza tu póliza de forma rápida y sencilla</TitleForm>
                    <SubTitleForm>Hogar</SubTitleForm>
                    <Divider style={{width: "95%", margin: "auto", background: "red", opacity: "0.5", marginTop: "5px"}} />
                    <FormHogar/>
                </PaperFormViajero>
            </Grid>
         
        </Grid>  
         </div>
    </AppWrapper>
)


export default HomePage