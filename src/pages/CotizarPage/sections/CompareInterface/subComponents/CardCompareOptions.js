import react from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCotizaPageContext } from '../../../../../context/CotizaPageContext/CotizaPageContext';
import ModalComparePlansPDF from '../../../../../components/PDF/ModalComparePlansPDF';

const ComeBackButtonContainer = styled.div`
    width: 90%;
    height: 100%;
    background: transparent;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0,.87);
    cursor: pointer;
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23);
    }
`;

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

const CardCompareOptions = () => {
    const { comeBackCompareToMain,
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
        plansCompareArray} = useCotizaPageContext();

        let arrayBudgetCur = [];
       arrayBudgetCur.push(budgetCur);
       let areaName = arrayBudgetCur[0].AREA_NAME;






    return (
        <>
           {areaName == "AUTOMOVIL" && (
        <ModalComparePlansPDF
          open={modalPDF} 
          handleClose={closeModalPDF}
          infoClient={arrayBudgetCur}
          plans={plansCompareArray}
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
          plans={plansCompareArray}
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
        plans={plansCompareArray} 
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
                        width: 280,
                        height: 326.5,
                        padding: '1rem 0'
                    }
                }}
            >
                <Paper elevation={24} sx={{
                        width: '180px',
                        height: '100%',
                        display: 'grid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 5px'
                    }}>
                    {/* <div>
                        11
                    </div> */}

                      <div style={{display:"flex"}}>
                     <ButtonPlanOption className="button-print-compare" onClick={printPDF}  >
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
                    </div>



                  
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ComeBackButtonContainer onClick={comeBackCompareToMain}>
                            <ArrowBackIosIcon 
                                sx={{
                                    fontSize: '18px',
                                    color: 'rgba(0, 0, 0,.87)',
                                    fontWeight: '600'
                                }}
                            />
                            <span style={{
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                letterSpacing: '-0.6px'
                            }}>
                                REGRESAR
                            </span>
                        </ComeBackButtonContainer>
                    </div>
                </Paper>
            </Box>
        </>
    );
};

export default CardCompareOptions;