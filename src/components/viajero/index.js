import { Divider, Grid } from "@mui/material"
import React from "react"
import Img from "react-cool-img";
import ImagenSeccion from "../ImagenSeccion/ImagenSeccion"
import { AppWrapper } from "../tools/AppWrapper"
import { BackgroundImage } from "../tools/ImageBackground"
import { PaperFormViajero } from "../tools/PaperFormViajero"
import { SubTitleForm, TitleForm } from "../tools/TituloForm"
import FormViajero  from "./formViajero"

const ViajeroPage = () => (
    <AppWrapper>
        <ImagenSeccion/>
        <div className="container-form-background" id="viajero">
        <BackgroundImage>
            <source srcSet="/asegurapro/cotizador/assets/image/fondoViajeResponsive.png" media="(max-width: 500px)"/>
            <Img 
                src="/asegurapro/cotizador/assets/image/fondoviaje.png" 
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
            height: "70vh",
            position: "absolute",
            top: "10px",
 }}
        >
            <Grid item sm={12} md={4} xs={12} lg={4} >
               
                <PaperFormViajero className="container-paper-form">
                    <TitleForm>Cotiza tu póliza de forma rápida y sencilla</TitleForm>
                    <SubTitleForm>Viajero</SubTitleForm>
                    <Divider style={{width: "95%", margin: "auto", background: "red", opacity: "0.5", marginTop: "5px"}} />
                    <FormViajero/>
                </PaperFormViajero>
            </Grid>
        </Grid>
        </div>
    </AppWrapper>
)

export default ViajeroPage