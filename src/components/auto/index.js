import { Divider, Grid } from "@mui/material"
import React from "react"
import ImagenSeccionAuto from "../ImagenSeccion/ImagenSeccionAuto"
import { AppWrapper } from "../tools/AppWrapper"
import { BackgroundImage } from "../tools/ImageBackground"
import { PaperFormAuto } from "../tools/PaperFormAuto"
import { SubTitleForm, TitleForm } from "../tools/TituloForm"
import FormAuto from "./formAuto"
import Img from "react-cool-img";

const AutoPage = () => (
    <AppWrapper>
         
        <ImagenSeccionAuto/>
        <div className="container-form-background" id="auto" >

            <BackgroundImage>
                <source srcSet="/asegurapro/cotizador/assets/image/fondoAutoResponsive.png" media="(max-width: 500px)"/>
                <Img 
                    src="/asegurapro/cotizador/assets/image/fondoAuto.png" 
                    alt="MDN"
                    lazy
                    cache
                    />
            </BackgroundImage>
        
            <Grid
            container
                style={{ display:"flex",
                    justifyContent: "start",
                    alignItems: "center",
                    height: "90vh",
                position: "absolute",
                top: "0",
                }}
            >  
        
            
                <Grid item sm={6} md={4} xs={12} lg={4}   >
            
                    <PaperFormAuto className="container-paper-form"> 
                        <TitleForm>Cotiza tu póliza de forma rápida y sencilla</TitleForm>
                        <SubTitleForm>AUTOMÓVIL</SubTitleForm>
                        <Divider style={{width: "95%", margin: "auto", background: "red", opacity: "0.5", marginTop: "5px"}} />
                        <FormAuto/>
                    </PaperFormAuto>
                </Grid>
            </Grid>
        </div>
    </AppWrapper>
)

export default AutoPage