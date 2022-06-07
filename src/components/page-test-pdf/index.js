import { Divider, Grid } from '@mui/material';
import Img from "react-cool-img";
import React from 'react';
import { AppWrapper } from '../tools/AppWrapper';
import { BackgroundImage } from '../tools/ImageBackground';
import { PaperFormViajero } from '../tools/PaperFormViajero';
import { SubTitleForm, TitleForm } from '../tools/TituloForm';
import PdfView from './pdfView';

const PDFPage = () => (
  <AppWrapper>
    <BackgroundImage>
      <source srcSet="/asegurapro/cotizador/assets/image/fondoHogarResponsive.png" media="(max-width: 500px)" />
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
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Grid item sm={6} md={4} xs={12} lg={4}>
        <PaperFormViajero>
          <TitleForm>PDF</TitleForm>
          <SubTitleForm>GENERATE PDF</SubTitleForm>
          <Divider
            style={{
              width: '95%',
              margin: 'auto',
              background: 'red',
              opacity: '0.5',
              marginTop: '5px',
            }}
          />
          <PdfView />
        </PaperFormViajero>
      </Grid>
    </Grid>
  </AppWrapper>
);

export default PDFPage;
