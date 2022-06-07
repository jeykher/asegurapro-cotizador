import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CompareIcon from '@mui/icons-material/Compare';
import { useCotizaPageContext } from '../../../context/CotizaPageContext/CotizaPageContext';
import AmountFormat from '../../tools/AmountFormat';
import CreateIcon from '@material-ui/icons/Create';
import { useState } from 'react';


const TituloPlan = styled.h6`
  font-size: 0.7rem;
  display: -webkit-box;
  overflow: hidden;
  margin-top: 0px !important;
  min-height: 35px;
  margin-bottom: 0px !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: #999;
  text-align: center;
`;

const DividerPlan = styled.hr`
  width: 100%;
  height: 2px;
  margin: 1rem;
  color: rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
`;

const Moneda = styled.span`
  font-weight: 400;
  line-height: 1;
  color: #777;
`;
const Precio = styled.span`
  font-size: 1.28em;
  color: #3c4858;
  /* margin-top: .625rem; */
  /* min-height: auto; */
  font-weight: 700;
  /* margin-bottom: 0.75rem; */
  text-decoration: none;
`;
const Fraccionamiento = styled.span`
  font-size: 58%;
  font-weight: 400;
  line-height: 1;
  color: #777;
`;

const BotonCotizar = styled(Button)`
  font-size: 0.8em;
  box-shadow: 0 2px 2px 0 rgb(252 45 34 / 14%),
    0 3px 1px -2px rgb(252 45 34 / 20%), 0 1px 5px 0 rgb(252 45 34 / 12%);
  background-color: #fc2d22 !important;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0.7rem 1px;
  padding: 12px 30px;
  position: relative;
  font-size: 12px;
  min-width: auto;
  box-shadow: 0 2px 2px 0 rgb(153 153 153 / 14%),
    0 3px 1px -2px rgb(153 153 153 / 20%), 0 1px 5px 0 rgb(153 153 153 / 12%);
  min-height: auto;
  text-align: center;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 400;
  line-height: 1.42857143;
  white-space: nowrap;
  will-change: box-shadow, transform;
  touch-action: manipulation;
  border-radius: 30px !important;
  letter-spacing: 0;
  text-transform: uppercase;
  vertical-align: middle;
  padding: 0.9em 2.9em;
  font-size: 0.7em !important;
`;

const ButtonComparar = styled(Button)`
  color: #ff9800 !important;
  border: none;
  cursor: pointer;
  box-shadow: none;
  margin-top: 1rem;
  font-size: 0.7em !important;
  @media(max-width:1023px){
    display:none !important;
  }
`;
const ButtonVerMas = styled(Button)`
  color: #fc2d22 !important;
  border: none;
  box-shadow: none;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.7em !important;
  min-width: 110%;
`;
const ContainerButtons = styled(Grid)`
  display: flex;
  justify-content: center;
`;
const CardPlan = ({
  plan_id,
  descplanprod,
  prima,
  fraccionamiento,
  sumaaseg,
  codmoneda,
  indsumaaseg,
  indmodsum
}) => {
  const {
    plan,
    addPlanToCompare,
    setCompareFooterVisible,
    verDetallePlanCotizacion,
    customSumAsegPlan,
    plansCompareArray,
    setPlansCompareArray,
    showDetail,
    setShowDetail,
    showEditSumDialog,
    setShowEditSumDialog,
    handleCloseSumEdit,
    cleanPlansToCompare
  } = useCotizaPageContext();
 
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          '& > :not(style)': {
            m: 1,
            width: 235,
            height: 320,
          },
        }}
      >
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0px 24px !important',
          }}
        >
          <TituloPlan>{descplanprod}</TituloPlan>
          <DividerPlan />
          <div style={{ minHeight: 120 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Moneda>{codmoneda == 'DL' ? '$' : null}</Moneda>
              <Precio>  <AmountFormat value={prima} /></Precio>
              <Fraccionamiento>/ Anual</Fraccionamiento>
            </div>

            {fraccionamiento.map((item) => (
              <div
                key={item.ideplan}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Moneda>{item.codmoneda == 'DL' ? '$' : null}</Moneda>
                <Precio>{item.prima}</Precio>
                <Fraccionamiento>/ {item.nomplan}</Fraccionamiento>
              </div>
            ))}
          </div> 
          <Grid container>
            {indsumaaseg == 'S' && (

              <Grid
                item
                xs={12}
                sx={{
                  marginTop: '1rem',
                }}
              >
                <TituloPlan>ASEGURADO POR:</TituloPlan>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '-18px', 
                  }} 
                >
                  <Moneda>{codmoneda == 'DL' ? '$' : null}</Moneda>
                  <Precio>
                    <AmountFormat value={sumaaseg} />
                  </Precio>
                  {(indmodsum === 'S' && !showDetail) && (
                    <CreateIcon color="secondary" style={{ marginLeft: 5, backgroundColor: "#FC2D22 !important", cursor: "pointer" }} 
                    onClick={() =>{
                      customSumAsegPlan(plan_id)
                      setShowEditSumDialog(true)
                      cleanPlansToCompare();
                    }} />
                  )}
                </div>
              </Grid>


            )}



          </Grid>
          <Grid container spacing={1} container>
            {/*                             
                                <ContainerButtons item xs={12}>
                                    <BotonCotizar variant="contained">COTIZAR</BotonCotizar>
                                </ContainerButtons>
                            */}
            {showDetail ? (
              <ContainerButtons item xs={12}>
                <ButtonVerMas
                  variant="text"
                  onClick={() => setShowDetail(false)}
                >
                  REGRESAR
                </ButtonVerMas>
              </ContainerButtons>
            ) : (
              <>
                <ContainerButtons item xs={12} md={6}>
                  <ButtonComparar
                  className="button-compare-plans"
                    variant="text"
                    onClick={() => addPlanToCompare(plan_id)}
                  >
                    <CompareIcon fontSize="small" />
                    COMPARAR
                  </ButtonComparar>
                </ContainerButtons>
                <ContainerButtons item xs={12} md={6}>
                  <ButtonVerMas
                    variant="text"
                    onClick={() => verDetallePlanCotizacion(plan_id)}
                  >
                    <FindInPageIcon fontSize="small" />
                    VER MAS
                  </ButtonVerMas>
                </ContainerButtons>
              </>
            )}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default CardPlan;
