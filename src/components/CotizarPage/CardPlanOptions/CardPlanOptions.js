import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { Button } from "@mui/material";
import styled from "styled-components";
import CardAccordion from "./CardAccordion/CardAccordion";
import { useCotizaPageContext } from "../../../context/CotizaPageContext/CotizaPageContext";
import "./CardAccordion/coberturas.css";
/*Import de PDF*/
import pdfObject from "../../PDF/jsonPdf";
import ModalComparePlansPDF from "../../PDF/ModalComparePlansPDF";

const ButtonPlanOption = styled(Button)`
  color: #fc2d22 !important;
  border: none;
  box-shadow: none;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.6em !important;
  margin: 0 0.7rem;
  font-weight: bold;
`;

const CardPlanOptions = () => {
 
  const {
    budgetCur: { AREA_NAME },
    modalPDF,
    setModalPDF,
    typeModalPDF,
    setTypeModalPDF,
    openModalPDF,
    closeModalPDF,
    printPDF,
    sendPDF,
    budgetCur,
    budgetInfo,
    planes,
    fraccionamientosAutomovil,
    setFraccionamientosAutomovil,
    coberturasAutomovil,
    setCoberturasAutomovil,
    comeBackToFirstInterface,
    coberturasHogar,
    edificacionesHogar,
    mobiliariosHogar,
    coberturasViajero,
  } = useCotizaPageContext();


  let arrayBudgetCur = [];
  arrayBudgetCur.push(budgetCur);

  let areaName = arrayBudgetCur[0].AREA_NAME;

  return (
    <div>
        {areaName == "AUTOMOVIL" && (
        <ModalComparePlansPDF
          open={modalPDF} 
          handleClose={closeModalPDF}
          infoClient={arrayBudgetCur}
          plans={planes}
          cobertsDescrip={coberturasAutomovil}
          payments={fraccionamientosAutomovil}
          type={areaName}
          hide={false}
          agesDescrip={[]}
          budgetInfo={budgetInfo}
          typeModal={typeModalPDF}
          propertyDescrip={coberturasAutomovil}
          cobertsProperty={coberturasAutomovil}
          selectedPays={fraccionamientosAutomovil}
        />
      )}

      {areaName == "VIAJE" && (
        <ModalComparePlansPDF
          open={modalPDF}
          handleClose={closeModalPDF}
          infoClient={arrayBudgetCur}
          plans={planes}
          cobertsDescrip={coberturasViajero}
          payments={[]}
          type={areaName}
          hide={false}
          agesDescrip={[]}
          budgetInfo={budgetInfo}
          typeModal={typeModalPDF}
          propertyDescrip={coberturasViajero}
          cobertsProperty={coberturasViajero}
          selectedPays={[]}
        />
      )}

      {areaName == "HOGAR" && (
          
       <ModalComparePlansPDF
        open={modalPDF}
        handleClose={closeModalPDF}
        infoClient={arrayBudgetCur}
        plans={planes} 
        // cobertsDescrip={[]}
        cobertsDescrip={coberturasHogar}
        payments={[]}
        type={areaName}
        hide={false}
        agesDescrip={[]}
        budgetInfo={budgetInfo}
        typeModal={typeModalPDF}
        propertyDescrip={[]}
        cobertsProperty={[]}
        selectedPays={[]}
        mobiliariosHogar={mobiliariosHogar}
        edificacionesHogar={edificacionesHogar}
      />)}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                        height: 70,
                    }
                }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Paper elevation={24} sx={{
                        width: '180px',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 5px'
                    }}>
                        <div>
                        <button 
                            style={{
                                border: '2px solid red',
                                padding: '2px',
                                width: '100px',
                                fontSize: "11px",
                                margin: "0 8px !important"
                                
                            }}
                            onClick={comeBackToFirstInterface}
                        >
                            REGRESAR
                        </button>
                        </div>
                    </Paper>
                </div>
                <Paper elevation={24} className="container-paper-pdf" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <ButtonPlanOption className="button-print-compare" onClick={printPDF}>
                        <PrintRoundedIcon 
                            sx={{ color: "#FC2D22 ", fontSize: 18, marginRight: '0.3rem' }}
                        />
                        IMPRIMIR
                    </ButtonPlanOption>
                    <ButtonPlanOption onClick={sendPDF}>
                        <MailRoundedIcon 
                            sx={{ color: "#FC2D22", fontSize: 18, marginRight: '0.3rem' }}
                        />
                        ENVIAR
                    </ButtonPlanOption>
                </Paper>
                {
                    AREA_NAME === "AUTOMOVIL" && (
                        <CardAccordion />   
                    )
                }
            </Box>
        </div>
      
  );
};

export default CardPlanOptions;
